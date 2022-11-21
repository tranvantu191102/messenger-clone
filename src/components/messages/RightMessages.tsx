import { FC, useState, useEffect, useRef } from "react";
import { ConversationInfo, MessageInfo } from "../../shared/types";
import { BsEmojiSmile } from "react-icons/bs";
import { FaReply } from "react-icons/fa";
import { GoTrashcan } from "react-icons/go";

import ReplyMessage from "./ReplyMessage";
import ReactionMessagePopup from "./ReactionMessagePopup";
import ReactionMessageStatus from "./ReactionMessageStatus";

interface RightMessagesProps {
  messagesInfo: MessageInfo;
  conversationInfo: ConversationInfo;
  messageId: string;
  handleOpenRemoveMessage: (value: string) => void;
  setMessageReply: (value: any) => void;
  conversationId: string;
}

const RightMessages: FC<RightMessagesProps> = ({
  messagesInfo,
  conversationInfo,
  messageId,
  handleOpenRemoveMessage,
  setMessageReply,
  conversationId,
}) => {
  const { sender } = messagesInfo;
  const [isOpenReactionPopup, setIsOpenReactionPopup] = useState(false);

  const reactToggleRef = useRef<HTMLDivElement | null>(null);
  const reactRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: any) => {
      if (reactToggleRef?.current === e?.target) {
        setIsOpenReactionPopup(true);
        return;
      }

      if (!reactRef?.current?.contains(e?.target)) {
        setIsOpenReactionPopup(false);
      }
    };

    window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  return (
    <div className="flex justify-end pr-8 my-2 group">
      {messagesInfo.type === "removed" ? (
        <div className="px-3 py-2 bg-gray-200 rounded-xl text-gray-600 italic">
          Tin nhắn đã thu hồi
        </div>
      ) : null}
      {messagesInfo.type === "text" ? (
        <div className="flex items-end flex-col ">
          {messagesInfo.replyTo ? (
            <ReplyMessage
              messageReply={messagesInfo.replyTo}
              conversationId={conversationId}
            />
          ) : null}
          <div className="flex items-center relative z-[99]">
            <div
              className="flex items-center mr-4 invisible opacity-0 pointer-events-none group-hover:visible
         group-hover:opacity-100 group-hover:pointer-events-auto"
            >
              <div
                className="p-2 mr-1 cursor-pointer relative"
                ref={reactToggleRef}
              >
                <BsEmojiSmile className="w-4 h-4 fill-gray-700 pointer-events-none" />
                {isOpenReactionPopup ? (
                  <div
                    className="absolute -top-12 -right-16 z-[99]"
                    ref={reactRef}
                  >
                    <ReactionMessagePopup
                      conversationId={conversationId as string}
                      messageId={messageId as string}
                      setIsOpenReactionPopup={setIsOpenReactionPopup}
                    />
                  </div>
                ) : null}
              </div>
              <div
                className="p-2 mr-1 cursor-pointer"
                onClick={() => setMessageReply({ sender, id: messageId })}
              >
                <FaReply className="w-4 h-4 fill-gray-700" />
              </div>
              <div
                className="p-2 mr-1 cursor-pointer"
                onClick={() => handleOpenRemoveMessage(messageId)}
              >
                <GoTrashcan className="w-4 h-4 fill-gray-700" />
              </div>
            </div>
            <div
              className="py-2 px-3 text-white rounded-xl max-w-[250px]"
              style={{ backgroundColor: `${conversationInfo.theme}` }}
            >
              <div className="text-base text-white font-normal">
                {messagesInfo.content}
              </div>
              {messagesInfo?.reactions ? (
                <div className="absolute -bottom-2 right-0">
                  <ReactionMessageStatus
                    messageId={messageId as string}
                    conversationId={conversationId as string}
                    messagesInfo={messagesInfo as MessageInfo}
                    conversationInfo={conversationInfo as ConversationInfo}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RightMessages;
