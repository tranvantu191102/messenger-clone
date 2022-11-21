import {
  FC,
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  useContext,
  FormEvent,
} from "react";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { ConversationInfo, MessageInfo } from "../../shared/types";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { AuthContext } from "../../contexts/AuthContext";

import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";

interface InputSectionProps {
  conversationInfo: ConversationInfo;
  conversationId: string;
  messageReply: any;
  setMessageReply: (value: any) => void;
}

const InputSection: FC<InputSectionProps> = ({
  conversationInfo,
  conversationId,
  messageReply,
  setMessageReply,
}) => {
  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState(false);
  const [message, setMessage] = useState<string>("");
  const { currentUser } = useContext(AuthContext);

  const emojiRef = useRef<HTMLDivElement>(null);
  const emojiToggleRef = useRef<any>(null);

  const hanldeSelectEmoji = (emojiData: EmojiClickData, event: MouseEvent) => {
    setMessage(message + emojiData?.emoji);
  };

  useEffect(() => {
    const handler = (e: any) => {
      if (emojiToggleRef?.current === e?.target) {
        setIsOpenEmojiPicker(true);
        return;
      }

      if (!emojiRef?.current?.contains(e?.target)) {
        setIsOpenEmojiPicker(false);
      }
    };

    window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const updateTimestamp = () => {
    updateDoc(doc(db, "conversations", conversationId as string), {
      updateAt: serverTimestamp(),
    });
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!message) return;

    addDoc(collection(db, "conversations", conversationId, "messages"), {
      sender: currentUser?.uid,
      type: "text",
      content: message,
      replyTo: messageReply,
      createdAt: serverTimestamp(),
    });
    setMessage("");
    setMessageReply(null);
    updateTimestamp();
  };

  return (
    <form className="w-[85%] flex items-center" onSubmit={handleSendMessage}>
      <div className="w-[90%] flex items-center px-5 py-2 bg-gray-200 rounded-xl">
        <input
          type="text"
          placeholder="Aa"
          value={message}
          className="w-[calc(100%-20px)] bg-transparent outline-none border-none text-lg text-black font-normal"
          onChange={(e) => handleChangeInput(e)}
        />
        <div className="ml-4 p-1 cursor-pointer relative" ref={emojiToggleRef}>
          <BsFillEmojiSmileFill
            style={{ fill: `${conversationInfo?.theme}` }}
            className="w-6 h-6 pointer-events-none"
          />
          {isOpenEmojiPicker ? (
            <div
              className="absolute -top-[460px] -left-[65px] -translate-x-1/2 z-[999999]"
              ref={emojiRef}
            >
              <EmojiPicker onEmojiClick={hanldeSelectEmoji} />
            </div>
          ) : null}
        </div>
      </div>

      <button className="w-[10%]" type="submit">
        <IoSend
          style={{ fill: `${conversationInfo?.theme}` }}
          className="w-6 h-6 cursor-pointer ml-8"
        />
      </button>
    </form>
  );
};

export default InputSection;
