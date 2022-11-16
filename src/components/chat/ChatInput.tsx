import { FC } from "react";
import { BsImage, BsFillEmojiSmileFill } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";
import { RiFile4Fill } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { ConversationInfo } from "../../shared/types";

interface ChatInputProps {
  conversationInfo: ConversationInfo;
}

const ChatInput: FC<ChatInputProps> = ({ conversationInfo }) => {
  return (
    <div className="w-full px-5 py-[11px] border-t-[1px] border-gray-300">
      <div className="flex items-center justify-between h-full">
        <div className="w-[15%] flex items-center justify-start">
          <div className="relative group">
            <BsImage
              style={{ fill: `${conversationInfo?.theme}` }}
              className="w-6 h-6 mr-6 cursor-pointer"
            />
            <div
              className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 min-w-[120px] bg-gray-800 
            text-white font-normal text-sm rounded-lg text-center invisible opacity-0 group-hover:visible group-hover:opacity-100
            transition-all duration-100"
            >
              Chọn hình ảnh
            </div>
          </div>
          <div className="relative group">
            <AiOutlineLink
              style={{ fill: `${conversationInfo?.theme}` }}
              className="w-6 h-6 mr-6 cursor-pointer"
            />
            <div
              className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 min-w-[80px] bg-gray-800 
            text-white font-normal text-sm rounded-lg text-center invisible opacity-0 group-hover:visible group-hover:opacity-100
            transition-all duration-100"
            >
              Chọn file
            </div>
          </div>
          <div className="relative group">
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
          </div>
        </div>
        <div className="w-[75%] flex items-center px-5 py-2 bg-gray-200 rounded-xl">
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
    </div>
  );
};

export default ChatInput;
