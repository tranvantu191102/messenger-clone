import { FC } from "react";
import { ConversationInfo } from "../../shared/types";

import FileSection from "./FileSection";
import InputSection from "./InputSection";

interface ChatInputProps {
  conversationInfo: ConversationInfo;
}

const ChatInput: FC<ChatInputProps> = ({ conversationInfo }) => {
  return (
    <div className="w-full px-5 py-[11px] border-t-[1px] border-gray-300">
      <div className="flex items-center justify-between h-full">
        <FileSection conversationInfo={conversationInfo} />
        <InputSection conversationInfo={conversationInfo} />
      </div>
    </div>
  );
};

export default ChatInput;
