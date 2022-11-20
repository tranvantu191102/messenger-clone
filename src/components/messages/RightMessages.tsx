import { FC } from "react";
import { ConversationInfo, MessageInfo } from "../../shared/types";
import { BsEmojiSmile } from "react-icons/bs";
import { FaReply } from "react-icons/fa";
import { GoTrashcan } from "react-icons/go";

interface RightMessagesProps {
  messagesInfo: MessageInfo;
  conversationInfo: ConversationInfo;
  messagesId: string;
}

const RightMessages: FC<RightMessagesProps> = ({
  messagesInfo,
  conversationInfo,
  messagesId,
}) => {
  return (
    <div className="flex justify-end pr-8 my-2 group">
      {messagesInfo.type === "removed" ? <div>Tin nhắn đã thu hồi</div> : null}
      {messagesInfo.type === "text" ? (
        <div className="flex items-center relative">
          <div
            className="flex items-center mr-4 invisible opacity-0 pointer-events-none group-hover:visible
         group-hover:opacity-100 group-hover:pointer-events-auto"
          >
            <div className="p-2 mr-1 cursor-pointer">
              <BsEmojiSmile className="w-4 h-4 fill-gray-700" />
            </div>
            <div className="p-2 mr-1 cursor-pointer">
              <FaReply className="w-4 h-4 fill-gray-700" />
            </div>
            <div className="p-2 mr-1 cursor-pointer">
              <GoTrashcan className="w-4 h-4 fill-gray-700" />
            </div>
          </div>
          <div
            className="py-2 px-3 text-white rounded-xl max-w-[250px]"
            style={{ backgroundColor: `${conversationInfo.theme}` }}
          >
            {messagesInfo.content}
          </div>
          <div className=""></div>
        </div>
      ) : null}
    </div>
  );
};

export default RightMessages;
