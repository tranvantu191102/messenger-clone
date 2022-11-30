import { FC, ChangeEvent, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { AiOutlineLink } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import { RiFile4Fill } from "react-icons/ri";
import { ConversationInfo } from "../../shared/types";
import { storage, db } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

interface FileSectionProps {
  conversationInfo: ConversationInfo;
  conversationId: string;
  messageReply: any;
}

const FileSection: FC<FileSectionProps> = ({
  conversationInfo,
  conversationId,
  messageReply,
}) => {
  const { currentUser } = useContext(AuthContext);

  const handleChangeInputImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image")) return;

    const FIVE_MB = 1024 * 1024 * 5;

    if (file.size > FIVE_MB) {
      alert("Kích thước lớn nhất của ảnh là 5MB");
      return;
    }

    const imageRef = ref(
      storage,
      `imageMEssages/${new Date().getTime()}-${file.name}`
    );

    const snap = await uploadBytes(imageRef, file);
    const photoURL = await getDownloadURL(ref(storage, snap.ref.fullPath));

    addDoc(collection(db, "conversations", conversationId, "messages"), {
      sender: currentUser?.uid,
      type: "image",
      content: photoURL,
      replyTo: messageReply,
      createdAt: serverTimestamp(),
    });
  };

  const handleChangeInputFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    console.log(file, "1");
    if (!file) return;

    const TWENTY_MB = 1024 * 1024 * 20;

    if (file.size > TWENTY_MB) {
      alert("Kích thước lớn nhất của ảnh là 20MB");
      return;
    }

    console.log(file, "2");

    const fileRef = ref(
      storage,
      `fileMessages/${new Date().getTime()}-${file.name}`
    );

    const snap = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

    addDoc(collection(db, "conversations", conversationId, "messages"), {
      sender: currentUser?.uid,
      type: file.type.startsWith("image") ? "image" : "file",
      file: !file.type.startsWith("image")
        ? {
            name: file.name,
            size: file.size,
          }
        : null,
      content: url,
      replyTo: messageReply,
      createdAt: serverTimestamp(),
    });
  };

  return (
    <div className="w-[15%] flex items-center justify-start">
      <form className="relative group">
        <label htmlFor="file-image">
          <BsImage
            style={{ fill: `${conversationInfo?.theme}` }}
            className="w-6 h-6 mr-6 cursor-pointer"
          />
        </label>
        <input
          type="file"
          id="file-image"
          hidden
          accept="image/png, image/gif, image/jpeg"
          onChange={(e) => handleChangeInputImage(e)}
        />
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 min-w-[120px] bg-gray-800 
    text-white font-normal text-sm rounded-lg text-center invisible opacity-0 group-hover:visible group-hover:opacity-100
    transition-all duration-100"
        >
          Chọn hình ảnh
        </div>
      </form>
      <form className="relative group">
        <label htmlFor="file-input">
          <AiOutlineLink
            style={{ fill: `${conversationInfo?.theme}` }}
            className="w-6 h-6 mr-6 cursor-pointer"
          />
        </label>
        <input
          type="file"
          id="file-input"
          hidden
          onChange={(e) => handleChangeInputFile(e)}
        />
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 min-w-[80px] bg-gray-800 
    text-white font-normal text-sm rounded-lg text-center invisible opacity-0 group-hover:visible group-hover:opacity-100
    transition-all duration-100"
        >
          Chọn file
        </div>
      </form>
      <form className="relative group">
        <RiFile4Fill
          style={{ fill: `${conversationInfo?.theme}` }}
          className="w-6 h-6 cursor-pointer"
        />
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 min-w-[120px] bg-gray-800 
    text-white font-normal text-sm rounded-lg text-center invisible opacity-0 group-hover:visible group-hover:opacity-100
    transition-all duration-100"
        >
          Chọn nhãn dán
        </div>
      </form>
    </div>
  );
};

export default FileSection;
