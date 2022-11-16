import { FC } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { BsImage } from "react-icons/bs";
import { RiFile4Fill } from "react-icons/ri";
import { ConversationInfo } from "../../shared/types";

interface FileSectionProps {
  conversationInfo: ConversationInfo;
}

const FileSection: FC<FileSectionProps> = ({ conversationInfo }) => {
  return (
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
  );
};

export default FileSection;
