import { FC, useState, useEffect, useRef, useContext } from "react";
import { ConversationInfo, MessageInfo } from "../../shared/types";
import { BsEmojiSmile } from "react-icons/bs";
import { FaReply } from "react-icons/fa";
import { GoTrashcan } from "react-icons/go";
import { ModalContext } from "../../contexts/ModalContext";
import { formatFileSize, formatFileName } from "../../shared/utils";

import ReplyMessage from "./ReplyMessage";
import ReactionMessagePopup from "./ReactionMessagePopup";
import ReactionMessageStatus from "./ReactionMessageStatus";
import { IMAGE_PROXY } from "../../shared/constants";
import { AiFillFile, AiOutlineDownload } from "react-icons/ai";

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
  const { sender, type } = messagesInfo;
  const [isOpenReactionPopup, setIsOpenReactionPopup] = useState(false);

  const reactToggleRef = useRef<HTMLDivElement | null>(null);
  const reactRef = useRef<HTMLDivElement | null>(null);

  const { setUrlImage } = useContext(ModalContext);

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
      ) : (
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
                onClick={() => setMessageReply({ sender, id: messageId, type })}
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
              className={`${
                messagesInfo.type === "text"
                  ? "py-2 px-3 rounded-xl"
                  : "rounded-md"
              } text-white  max-w-[250px]`}
              style={{ backgroundColor: `${conversationInfo.theme}` }}
            >
              {messagesInfo.type === "text" ? (
                <div className="text-base text-white font-normal">
                  {messagesInfo.content}
                </div>
              ) : null}
              {messagesInfo.type === "image" ? (
                <div onClick={() => setUrlImage(messagesInfo.content)}>
                  <img
                    src={IMAGE_PROXY(messagesInfo.content)}
                    alt=""
                    className="rounded-md cursor-pointer"
                  />
                </div>
              ) : null}
              {messagesInfo.type === "file" ? (
                <div className="flex items-center px-2 py-1">
                  <a
                    href={messagesInfo.content}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mr-4"
                  >
                    <AiOutlineDownload className="w-5 h-5" />
                  </a>
                  <div className="flex items-center  mr-4">
                    <AiFillFile className="w-5 h-5 mr-2" />
                    <div>
                      <div>
                        {formatFileName(messagesInfo.file?.name as string)}
                      </div>
                      <div>
                        {formatFileSize(Number(messagesInfo.file?.size))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
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
      )}
    </div>
  );
};

export default RightMessages;
