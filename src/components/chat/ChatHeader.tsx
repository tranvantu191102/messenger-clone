import { FC, useContext, useEffect } from "react";
import { ConversationInfo } from "../../shared/types";
import { IMAGE_PROXY, AVATAR_DEFAULT } from "../../shared/constants";
import { useInfoUsers } from "../../hooks/useInfoUsers";
import { AuthContext } from "../../contexts/AuthContext";

import { IoCall } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import Skeleton from "../Skeleton";

interface ChatHeaderProps {
  conversationInfo: ConversationInfo;
  setIsOpenSettingConversation: (value: boolean) => void;
  setIsOpenGroupInfo: (value: boolean) => void;
}

const ChatHeader: FC<ChatHeaderProps> = ({
  conversationInfo,
  setIsOpenSettingConversation,
  setIsOpenGroupInfo,
}) => {
  const { currentUser } = useContext(AuthContext);
  const { data: users, loading } = useInfoUsers(conversationInfo?.users);

  const filtered = users?.filter(
    (user) => user?.data()?.uid !== currentUser?.uid
  );
  // console.log(filtered?.[0]?.data());
  useEffect(() => {
    document.title = "Conversation";
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-between px-5 py-[11.5px] w-full">
        <div className="flex items-center justify-start ">
          <Skeleton className="w-[50px] h-[50px] rounded mr-4" />
          <Skeleton className="w-[100px] h-[15px]" />
        </div>
        <div className="flex items-center justify-start ">
          <Skeleton className="w-[40px] h-[40px] rounded mr-4" />
          <Skeleton className="w-[40px] h-[40px] rounded mr-4" />
        </div>
      </div>
    );
  }

  return (
    <div className=" w-full px-5 py-[11px] border-b-[1px] border-gray-300">
      {filtered?.length === 1 ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <div className="w-[50px] h-[50px] mr-4">
              <img
                src={
                  IMAGE_PROXY(filtered?.[0]?.data()?.photoURL) || AVATAR_DEFAULT
                }
                alt=""
                className="w-full h-full rounded-full flex-shrink-0"
              />
            </div>
            <div className="font-semibold text-lg text-black w-[320px] truncate">
              {filtered?.[0]?.data()?.displayName}
            </div>
          </div>
          <div className="flex items-center mr-5">
            <div className="p-2 cursor-pointer mr-10 relative group">
              <IoCall
                className="w-8 h-8"
                style={{ fill: `${conversationInfo?.theme}` }}
              />
              <div
                className="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 min-w-[160px] py-[2px] bg-gray-800 text-white 
              font-normal text-base rounded-lg text-center invisible opacity-0 group-hover:visible group-hover:opacity-100
              transition-all duration-100 z-[9999]
              "
              >
                Bắt đầu gọi video
                <span className="absolute z-[-1] -top-1 left-1/2 -translate-x-1/2 w-4 h-4 transform rotate-45 bg-gray-800"></span>
              </div>
            </div>
            <div
              className="p-1 cursor-pointer rounded-full relative group"
              style={{ backgroundColor: `${conversationInfo?.theme}` }}
              onClick={() => setIsOpenSettingConversation(true)}
            >
              <HiDotsHorizontal className="w-6 h-6 fill-white" />
              <div
                className="absolute top-[calc(100%+10px)] right-0 min-w-[200px] py-[2px] bg-gray-800 text-white 
              font-normal text-base rounded-lg text-center invisible opacity-0 group-hover:visible group-hover:opacity-100
              transition-all duration-100 z-[9999]
              "
              >
                Cài đặt cuộc trò chuyện
                <span className="absolute z-1 -top-1 right-2 w-4 h-4 transform rotate-45 bg-gray-800"></span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between pb-[2px]">
          <div className="flex items-center justify-start">
            {conversationInfo?.group?.groupImage ? (
              <div className="w-[48px] h-[48px] mr-4">
                <img
                  src={IMAGE_PROXY(conversationInfo?.group?.groupImage)}
                  alt=""
                  className="w-full h-full rounded-full flex-shrink-0"
                />
              </div>
            ) : (
              <div className="mr-4 relative w-[50px] ">
                <div
                  className="w-[32px] h-[32px] border-[1px] border-gray-200 rounded-full
              absolute top-0 right-0
              "
                >
                  <img
                    src={
                      IMAGE_PROXY(filtered?.[0]?.data()?.photoURL) ||
                      AVATAR_DEFAULT
                    }
                    alt=""
                    className="w-[30px] h-[30px] rounded-full object-cover"
                  />
                </div>
                <div
                  className="w-[31px] h-[31px] border-[1px] border-gray-200 rounded-full
               absolute top-1/2 -translate-y-1/2 left-0
              "
                >
                  <img
                    src={
                      IMAGE_PROXY(filtered?.[1]?.data()?.photoURL) ||
                      AVATAR_DEFAULT
                    }
                    alt=""
                    className="w-[30px] h-[30px] rounded-full object-cover"
                  />
                </div>
              </div>
            )}
            <div className="font-semibold text-lg text-black truncate w-[320px]">
              {`${
                conversationInfo?.group?.groupName ||
                `${filtered?.[0]?.data()?.displayName}, ${
                  filtered?.[1]?.data()?.displayName
                }`
              }`}
            </div>
          </div>
          <div className="flex items-center mr-5">
            <div className="p-2 cursor-pointer mr-10 relative group">
              <IoCall
                className="w-8 h-8"
                style={{ fill: `${conversationInfo?.theme}` }}
              />
              <div
                className="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 min-w-[160px] py-[2px] bg-gray-800 text-white 
              font-normal text-base rounded-lg text-center invisible opacity-0 group-hover:visible group-hover:opacity-100
              transition-all duration-100 z-[9999]
              "
              >
                Bắt đầu gọi video
                <span className="absolute z-[-1] -top-1 left-1/2 -translate-x-1/2 w-4 h-4 transform rotate-45 bg-gray-800"></span>
              </div>
            </div>
            <div
              className="p-2 cursor-pointer mr-10 relative group"
              onClick={() => setIsOpenGroupInfo(true)}
            >
              <FaUserFriends
                className="w-8 h-8"
                style={{ fill: `${conversationInfo?.theme}` }}
              />
              <div
                className="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 min-w-[180px] py-[2px] bg-gray-800 text-white 
              font-normal text-base rounded-lg text-center invisible opacity-0 group-hover:visible group-hover:opacity-100
              transition-all duration-100 z-[9999]
              "
              >
                Thông tin thành viên
                <span className="absolute z-[-1] -top-1 left-1/2 -translate-x-1/2 w-4 h-4 transform rotate-45 bg-gray-800"></span>
              </div>
            </div>
            <div
              className="p-1 cursor-pointer rounded-full relative group"
              style={{ backgroundColor: `${conversationInfo?.theme}` }}
              onClick={() => setIsOpenSettingConversation(true)}
            >
              <HiDotsHorizontal className="w-6 h-6 fill-white" />
              <div
                className="absolute top-[calc(100%+10px)] right-0 min-w-[200px] py-[2px] bg-gray-800 text-white 
              font-normal text-base rounded-lg text-center invisible opacity-0 group-hover:visible group-hover:opacity-100
              transition-all duration-100 z-[9999]
              "
              >
                Cài đặt cuộc trò chuyện
                <span className="absolute z-1 -top-1 right-2 w-4 h-4 transform rotate-45 bg-gray-800"></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
