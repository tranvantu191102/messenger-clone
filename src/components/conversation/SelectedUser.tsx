import { FC, useContext, useEffect, useState } from "react";
import { ConversationInfo } from "../../shared/types";
import { AVATAR_DEFAULT, IMAGE_PROXY } from "../../shared/constants";
import { AuthContext } from "../../contexts/AuthContext";
import { useInfoUsers } from "../../hooks/useInfoUsers";
import { useLastMessage } from "../../hooks/useLastMessage";
import { formatTime } from "../../shared/utils";

import Skeleton from "../Skeleton";
import { Link, useParams } from "react-router-dom";

interface SelectedUserProps {
  conversationInfo: ConversationInfo;
  conversationId: string;
}

const SelectedUser: FC<SelectedUserProps> = ({
  conversationInfo,
  conversationId,
}) => {
  const [userInfoLastMessage, setUserInfoLastMessage] = useState<any>(null);
  const { currentUser } = useContext(AuthContext);
  const { loading, data } = useInfoUsers(conversationInfo.users);
  const { id } = useParams();
  const filtered = data?.filter(
    (user) => user?.data()?.uid !== currentUser?.uid
  );

  const { data: lastMessage } = useLastMessage(conversationId);
  useEffect(() => {
    data?.forEach((user) => {
      if (user?.data()?.uid === lastMessage?.docs?.[0]?.data().sender) {
        setUserInfoLastMessage(user as any);
      }
    });
  }, [lastMessage]);

  console.log(lastMessage?.docs?.[0]?.data());

  if (loading) {
    return (
      <div className="flex items-center justify-start px-5 py-3 ">
        <div>
          <Skeleton className="w-[50px] h-[50px] rounded-full mr-4" />
        </div>
        <div>
          <Skeleton className="w-[200px] h-[20px] mb-4" />
          <Skeleton className="w-[200px] h-[10px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {conversationInfo.users.length === 2 ? (
        <Link to={`/conversation/${conversationId}`}>
          <div
            className={`flex items-center justify-start px-5 py-3 hover:bg-gray-100 cursor-pointer ${
              id === conversationId ? "bg-gray-100" : "bg-white"
            }`}
          >
            <div className="w-[50px] h-[50px] mr-4">
              <img
                src={
                  IMAGE_PROXY(filtered?.[0]?.data()?.photoURL) || AVATAR_DEFAULT
                }
                alt=""
                className="w-full h-full rounded-full"
              />
            </div>
            <div>
              <div className="font-semibold text-lg text-black truncate w-[250px]">
                {filtered?.[0]?.data()?.displayName}
              </div>
              <div className=" flex items-center">
                <p className="font-normal text-sm text-gray-700 w-[180px] truncate overflow-hidden">
                  {lastMessage?.docs?.length !== 0
                    ? lastMessage?.docs?.[0].data()?.sender === currentUser?.uid
                      ? "Bạn: "
                      : ""
                    : ""}
                  {lastMessage?.docs?.length === 0
                    ? "Không có tin nhắn nào gần đây."
                    : lastMessage?.docs?.[0].data()?.type === "text"
                    ? `${lastMessage?.docs?.[0].data()?.content}`
                    : lastMessage?.docs?.[0].data()?.type === "image"
                    ? `Đã gửi 1 ảnh`
                    : lastMessage?.docs?.[0].data()?.type === "file"
                    ? `Đã gửi 1 file đính kèm`
                    : lastMessage?.docs?.[0].data()?.type === "removed"
                    ? "Đã gở 1 tin nhắn"
                    : ""}
                </p>
                <span className="font-normal text-sm text-gray-700">
                  {lastMessage?.docs?.length !== 0
                    ? `. ${formatTime(
                        lastMessage?.docs?.[0]?.data()?.createdAt?.nanoseconds,
                        lastMessage?.docs?.[0]?.data()?.createdAt?.seconds
                      )}`
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <Link to={`/conversation/${conversationId}`} className="block w-full">
          <div
            className={`w-full flex items-center justify-start px-5 py-3 hover:bg-gray-100 cursor-pointer ${
              id === conversationId ? "bg-gray-100" : "bg-white"
            }`}
          >
            {conversationInfo?.group?.groupImage ? (
              <div className="w-[50px] h-[50px] mr-4">
                <img
                  src={IMAGE_PROXY(conversationInfo?.group?.groupImage)}
                  alt=""
                  className="w-full h-full rounded-full"
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
                    className="w-[30px] h-[30px] rounded-full"
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
                    className="w-[30px] h-[30px] rounded-full"
                  />
                </div>
              </div>
            )}
            <div>
              <div className="font-semibold text-lg text-black truncate w-[250px]">
                {`${
                  conversationInfo?.group?.groupName ||
                  `${filtered?.[0]?.data()?.displayName}, ${
                    filtered?.[1]?.data()?.displayName
                  }`
                }`}
              </div>
              <div className=" flex items-center">
                <p className="font-normal text-sm text-gray-700 truncate w-[180px] overflow-hidden inline-block">
                  {lastMessage?.docs?.length !== 0
                    ? lastMessage?.docs?.[0].data()?.sender === currentUser?.uid
                      ? "Bạn: "
                      : ""
                    : ""}
                  {userInfoLastMessage &&
                  lastMessage?.docs?.[0].data()?.sender !== currentUser?.uid
                    ? `${
                        userInfoLastMessage?.data()?.displayName?.split(" ")[0]
                      }: `
                    : ""}
                  {lastMessage?.docs?.length === 0
                    ? "Không có tin nhắn nào gần đây."
                    : lastMessage?.docs?.[0].data()?.type === "text"
                    ? `${lastMessage?.docs?.[0].data()?.content}`
                    : lastMessage?.docs?.[0].data()?.type === "image"
                    ? `Đã gửi 1 ảnh`
                    : lastMessage?.docs?.[0].data()?.type === "file"
                    ? `Đã gửi 1 file đính kèm`
                    : lastMessage?.docs?.[0].data()?.type === "removed"
                    ? "Đã gở 1 tin nhắn"
                    : ""}
                </p>
                <span className="font-normal text-sm text-gray-700">
                  {lastMessage?.docs?.length !== 0
                    ? `. ${formatTime(
                        lastMessage?.docs?.[0]?.data()?.createdAt?.nanoseconds,
                        lastMessage?.docs?.[0]?.data()?.createdAt?.seconds
                      )}`
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default SelectedUser;
