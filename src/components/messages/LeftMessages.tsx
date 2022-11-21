import { FC, useState, useEffect, useRef } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaReply } from "react-icons/fa";
import { MessageInfo, ConversationInfo } from "../../shared/types";
import { useInfoUsers } from "../../hooks/useInfoUsers";
import { AVATAR_DEFAULT, IMAGE_PROXY } from "../../shared/constants";
import ReactionMessagePopup from "./ReactionMessagePopup";
import ReactionMessageStatus from "./ReactionMessageStatus";

import ReplyMessage from "./ReplyMessage";

interface LeftMessagesProps {
  messagesInfo: MessageInfo;
  conversationInfo: ConversationInfo;
  getAvatar: boolean;
  setMessageReply: (value: any) => void;
  messageId: string;
  conversationId: string;
}

const LeftMessages: FC<LeftMessagesProps> = ({
  messagesInfo,
  conversationInfo,
  getAvatar,
  setMessageReply,
  messageId,
  conversationId,
}) => {
  const { data } = useInfoUsers([messagesInfo?.sender]);
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
    <div className="w-full">
      {messagesInfo.type === "removed" ? (
        <div className="flex items-center  my-2 ml-5">
          {getAvatar ? (
            <div className="w-[30px] h-[30px] mr-4 relative">
              <img
                src={IMAGE_PROXY(data?.[0]?.data()?.photoURL) || AVATAR_DEFAULT}
                alt=""
                className="w-full h-full rounded-full"
              />
              {conversationInfo?.users.length > 2 ? (
                <div
                  className="absolute -top-5 left-1/2 -translate-x-1/2 w-fit block text-sm text-gray-600
                invisible opacity-0 group-hover:visible group-hover:opacity-100
                "
                >
                  {data?.[0]?.data()?.displayName.split(" ").reverse()[0]}
                </div>
              ) : null}
            </div>
          ) : null}
          <div
            className={`px-3 py-2 bg-gray-200 rounded-xl text-gray-600 italic inline-block ${
              getAvatar ? " " : "ml-12"
            }`}
          >
            Tin nhắn đã thu hồi
          </div>
        </div>
      ) : null}
      {messagesInfo.type === "text" ? (
        <div className="flex items-start flex-col w-full">
          {messagesInfo.replyTo ? (
            <ReplyMessage
              messageReply={messagesInfo?.replyTo}
              conversationId={conversationId as string}
            />
          ) : null}
          <div className="flex items-center my-2 pl-5 group w-full">
            <div className="flex items-center">
              {getAvatar ? (
                <div className="w-[30px] h-[30px] mr-4 relative">
                  <img
                    src={
                      IMAGE_PROXY(data?.[0]?.data()?.photoURL) || AVATAR_DEFAULT
                    }
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                  {conversationInfo?.users.length > 2 ? (
                    <div
                      className="absolute -top-5 left-1/2 -translate-x-1/2 w-fit block text-sm text-gray-600
                invisible opacity-0 group-hover:visible group-hover:opacity-100
                "
                    >
                      {data?.[0]?.data()?.displayName.split(" ").reverse()[0]}
                    </div>
                  ) : null}
                </div>
              ) : null}
              <div
                className={`py-2 px-3 bg-gray-200 rounded-xl max-w-[250px] relative ${
                  getAvatar ? "" : "ml-12"
                }`}
              >
                <div className="text-base text-black font-normal">
                  {messagesInfo.content}
                </div>
                {messagesInfo?.reactions ? (
                  <div className="absolute -bottom-2 left-0">
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
                    className="absolute -top-12 left-0 z-[99]"
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
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LeftMessages;
