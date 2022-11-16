import { FC, useState, ChangeEvent, useContext } from "react";
import { ImCross } from "react-icons/im";
import { SlArrowDown } from "react-icons/sl";
import { IoColorPaletteOutline } from "react-icons/io5";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineFileText } from "react-icons/ai";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { BiImageAdd, BiLogOut } from "react-icons/bi";

import { THEMES } from "../shared/constants";
import { ConversationInfo } from "../shared/types";
import { db, storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc, doc, arrayRemove } from "firebase/firestore";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface SettingConversationProps {
  setIsOpenSettingConversation: (value: boolean) => void;
  conversationInfo: ConversationInfo;
  conversationId: string;
}

const SettingConversation: FC<SettingConversationProps> = ({
  setIsOpenSettingConversation,
  conversationInfo,
  conversationId,
}) => {
  const [isShowTheme, setIsShowTheme] = useState<boolean>(false);
  const [isShowChangeNameGroup, setIsShowChangeNameGroup] =
    useState<boolean>(false);
  const [nameValue, setNameValue] = useState<string>(
    conversationInfo?.group?.groupName as string
  );
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChangeTheme = (value: string) => {
    updateDoc(doc(db, "conversations", conversationId as string), {
      theme: value,
    });
  };

  const handleChangeNameGroup = () => {
    updateDoc(doc(db, "conversations", conversationId as string), {
      group: {
        admin: conversationInfo?.group?.admin,
        groupName: nameValue,
        groupImage: conversationInfo?.group?.groupImage,
      },
    });

    setIsOpenSettingConversation(false);
    setIsShowChangeNameGroup(false);
  };

  const handleOnChangeImageGroup = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image")) return;

    const FIVE_MB = 1024 * 1024 * 5;

    if (file.size > FIVE_MB) {
      alert("Kích thước lớn nhất của ảnh là 20MB");
      return;
    }

    const imageRef = ref(
      storage,
      `imageGroup/${new Date().getTime()}-${file.name}`
    );

    const snap = await uploadBytes(imageRef, file);
    const photoURL = await getDownloadURL(ref(storage, snap.ref.fullPath));
    updateDoc(doc(db, "conversations", conversationId), {
      "group.groupImage": photoURL,
    });
  };

  const handleLeaveGroup = () => {
    updateDoc(doc(db, "conversations", conversationId), {
      users: arrayRemove(currentUser?.uid as string),
      group: {
        admin: arrayRemove(currentUser?.uid as string),
        groupName: conversationInfo?.group?.groupName,
        groupImage: conversationInfo?.group?.groupImage,
      },
    });

    navigate("/conversation");
  };

  return (
    <div className="fixed inset-0 w-full h-full z-10 bg-[rgba(0,0,0,0.5)] text-black">
      <div className="w-full h-full relative">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] 
        h-fit bg-white rounded-lg mb-10"
        >
          <div className="flex items-center justify-between px-4 py-2 border-b-[1px] border-gray-300">
            <div></div>
            <p className="text-xl font-semibold">Cài đặt cuộc trò chuyện</p>
            <div
              className=" cursor-pointer"
              onClick={() => setIsOpenSettingConversation(false)}
            >
              <ImCross className="w-8 h-8 rounded-full p-2 bg-gray-300 text-gray-500" />
            </div>
          </div>
          <div
            className="py-3  cursor-pointer hover:bg-gray-100"
            onClick={() => setIsShowTheme(!isShowTheme)}
          >
            <div className="flex items-center justify-between px-4 ">
              <div className="flex items-center ">
                <IoColorPaletteOutline className="w-6 h-6 mr-4" />
                <div className="text-lg font-medium text-black">
                  Thay đổi chủ đề
                </div>
              </div>
              <SlArrowDown
                className={`${
                  isShowTheme ? "transform rotate-180" : "rotate-0"
                } transition-all duration-200 w-5 h-5`}
              />
            </div>
          </div>
          <div
            className={`flex items-center flex-wrap justify-center  transition-all duration-200 
             ${
               isShowTheme
                 ? "h-[130px] visible opacity-100 mt-5 mb-5"
                 : "h-0 invisible opacity-0"
             }`}
          >
            {isShowTheme
              ? THEMES.map((theme) => (
                  <div
                    className="w-16 h-16 rounded-full mr-5 transition-all duration-200 relative cursor-pointer"
                    style={{ backgroundColor: `${theme}` }}
                    onClick={() => handleChangeTheme(theme)}
                    key={theme}
                  >
                    <BsCheckLg
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-white ${
                        conversationInfo?.theme === theme ? "block" : "hidden"
                      }`}
                    />
                  </div>
                ))
              : null}
          </div>
          <div className="">
            <div className="flex items-center px-5 py-3  hover:bg-gray-100 cursor-pointer">
              <AiOutlineFileText className="w-6 h-6 mr-4" />
              <div className="text-lg font-medium text-black">
                File phương tiện, hình ảnh
              </div>
            </div>
          </div>
          {conversationInfo.users.length > 2 ? (
            <div>
              <div>
                <div
                  className="flex items-center justify-between px-5 hover:bg-gray-100 py-3 cursor-pointer"
                  onClick={() =>
                    setIsShowChangeNameGroup(!isShowChangeNameGroup)
                  }
                >
                  <div className="flex items-center">
                    <MdDriveFileRenameOutline className="w-6 h-6 mr-4" />
                    <div className="text-lg font-medium text-black">
                      Đổi tên đoạn chat
                    </div>
                  </div>
                  <SlArrowDown
                    className={`${
                      isShowChangeNameGroup
                        ? "transform rotate-180"
                        : "rotate-0"
                    } transition-all duration-200 w-5 h-5`}
                  />
                </div>

                <div
                  className={` w-full transition-all duration-200 ${
                    isShowChangeNameGroup
                      ? "h-[50px] visible opacity-100  "
                      : "h-0 invisible opacity-0"
                  }`}
                >
                  <div className="px-5 py-2">
                    <input
                      type="text"
                      value={(nameValue as string) || ""}
                      className="px-4 py-1 border-[1px] border-gray-500 outline-none mr-2 rounded-lg 
                      w-[calc(100%-70px)] text-lg font-medium"
                      onChange={(e) => setNameValue(e?.target?.value)}
                    />
                    <button
                      className="text-lg px-3 py-1 rounded-lg text-white bg-blue-500 font-medium"
                      onClick={handleChangeNameGroup}
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="input-file"
                  className="flex items-center px-5 hover:bg-gray-100 py-3 cursor-pointer"
                >
                  <BiImageAdd className="w-6 h-6 mr-4" />
                  <div className="text-lg font-medium text-black">
                    Thay đổi ảnh
                  </div>
                </label>
                <input
                  type="file"
                  hidden
                  id="input-file"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={(e) => handleOnChangeImageGroup(e)}
                />
              </div>
              <div
                className="flex items-center px-5 hover:bg-gray-100 py-3 cursor-pointer rounded-b-lg"
                onClick={handleLeaveGroup}
              >
                <BiLogOut className="w-6 h-6 mr-4" />
                <div className="text-lg font-medium text-black">Rời nhóm</div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SettingConversation;
