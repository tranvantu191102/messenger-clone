import { FC, useContext } from "react";
import { ConversationInfo, MessageInfo } from "../../shared/types";
import { ImCross } from "react-icons/im";
import { AuthContext } from "../../contexts/AuthContext";

import FileSection from "./FileSection";
import InputSection from "./InputSection";

interface ChatInputProps {
  conversationInfo: ConversationInfo;
  conversationId: string;
  messageReply: MessageInfo;
  setMessageReply: (value: MessageInfo | null) => void;
}

const ChatInput: FC<ChatInputProps> = ({
  conversationInfo,
  conversationId,
  messageReply,
  setMessageReply,
}) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="w-full px-5 py-[11px] border-t-[1px] border-gray-300">
      {messageReply ? (
        <div className="flex items-center justify-between px-5 py-2 ">
          <div>
            <div className="text-lg text-black font-medium">{`${
              messageReply?.sender === currentUser?.uid
                ? "Đang trả lời chính mình"
                : "Đang trả lời"
            }`}</div>
            <div className="text-sm text-gray-700 font-normal italic truncate w-[500px]">
              {messageReply?.content}
            </div>
          </div>
          <div
            onClick={() => setMessageReply(null)}
            className="cursor-pointer px-3 py-1"
          >
            <ImCross />
          </div>
        </div>
      ) : null}
      <div className="flex items-center justify-between h-full">
        <FileSection conversationInfo={conversationInfo} />
        <InputSection
          conversationInfo={conversationInfo}
          conversationId={conversationId}
          messageReply={messageReply as any}
          setMessageReply={setMessageReply}
        />
      </div>
    </div>
  );
};

export default ChatInput;
