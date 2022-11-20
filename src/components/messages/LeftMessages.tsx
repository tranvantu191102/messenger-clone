import { FC } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaReply } from "react-icons/fa";
import { MessageInfo, ConversationInfo } from "../../shared/types";
import { useInfoUsers } from "../../hooks/useInfoUsers";
import { AVATAR_DEFAULT } from "../../shared/constants";

interface LeftMessagesProps {
  messagesInfo: MessageInfo;
  conversationInfo: ConversationInfo;
}

const LeftMessages: FC<LeftMessagesProps> = ({
  messagesInfo,
  conversationInfo,
}) => {
  const { data } = useInfoUsers([messagesInfo?.sender]);

  return (
    <div>
      {messagesInfo.type === "removed" ? <div>Tin nhắn đã thu hồi</div> : null}
      {messagesInfo.type === "text" ? (
        <div className="flex items-center my-2 ml-5 group">
          <div className="flex items-center">
            <div className="w-[30px] h-[30px] mr-4 relative">
              <img
                src={data?.[0]?.data()?.photoURL || AVATAR_DEFAULT}
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
            <div className="py-2 px-3 bg-gray-200 rounded-xl max-w-[250px]">
              {messagesInfo.content}
            </div>
          </div>
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
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LeftMessages;
