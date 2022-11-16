import { FC, useContext } from "react";
import { ConversationInfo } from "../../shared/types";
import { AVATAR_DEFAULT, IMAGE_PROXY } from "../../shared/constants";
import { AuthContext } from "../../contexts/AuthContext";
import { useInfoUsers } from "../../hooks/useInfoUsers";

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
  const { currentUser } = useContext(AuthContext);
  const { loading, data } = useInfoUsers(conversationInfo.users);
  const { id } = useParams();
  const filtered = data?.filter(
    (user) => user?.data()?.uid !== currentUser?.uid
  );

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
    <div>
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
              <div className="font-normal text-sm text-gray-700">
                Không có tin nhắn nào gần đây.
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
              <div className="font-normal text-sm text-gray-700">
                Không có tin nhắn nào gần đây.
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default SelectedUser;
