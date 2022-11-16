import { FC } from "react";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { ConversationInfo } from "../../shared/types";

interface InputSectionProps {
  conversationInfo: ConversationInfo;
}

const InputSection: FC<InputSectionProps> = ({ conversationInfo }) => {
  return (
    <div className="w-[85%] flex items-center">
      <div className="w-[90%] flex items-center px-5 py-2 bg-gray-200 rounded-xl">
        <input
          type="text"
          placeholder="Aa"
          className="w-[calc(100%-20px)] bg-transparent outline-none border-none text-lg text-black font-normal"
        />
        <div className="ml-4 p-1 cursor-pointer">
          <BsFillEmojiSmileFill
            style={{ fill: `${conversationInfo?.theme}` }}
            className="w-6 h-6"
          />
        </div>
      </div>
      <div className="w-[10%]">
        <IoSend
          style={{ fill: `${conversationInfo?.theme}` }}
          className="w-6 h-6 cursor-pointer ml-8"
        />
      </div>
    </div>
  );
};

export default InputSection;
