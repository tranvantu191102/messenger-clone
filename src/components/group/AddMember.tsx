import { FC } from "react";
import { ConversationInfo } from "../../shared/types";
import { useQueryCollection } from "../../hooks/useQueryCollection";
import { db } from "../../firebase/config";
import { query, collection, where } from "firebase/firestore";
import { IMAGE_PROXY, AVATAR_DEFAULT } from "../../shared/constants";

import { AiOutlinePlusSquare } from "react-icons/ai";
import Skeleton from "../Skeleton";

interface AddMemberProps {
  conversationInfo: ConversationInfo;
  conversationId: string;
}

const AddMember: FC<AddMemberProps> = ({
  conversationInfo,
  conversationId,
}) => {
  const { loading, data } = useQueryCollection(
    query(
      collection(db, "users"),
      where(
        "uid",
        "not-in",
        conversationInfo?.users?.length > 10
          ? conversationInfo?.users?.slice(0, 10)
          : conversationInfo?.users
      )
    )
  );

  if (loading) {
    return (
      <div className="py-3 px-5 h-[60vh] overflow-y-auto">
        <div className="flex items-center py-3">
          <Skeleton className="w-[50px] h-[50px] rounded-full mr-4" />
          <Skeleton className="w-[200px] h-[20px]" />
        </div>
        <div className="flex items-center py-3">
          <Skeleton className="w-[50px] h-[50px] rounded-full mr-4" />
          <Skeleton className="w-[200px] h-[20px]" />
        </div>
        <div className="flex items-center py-3">
          <Skeleton className="w-[50px] h-[50px] rounded-full mr-4" />
          <Skeleton className="w-[200px] h-[20px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="py-3 px-5 h-[60vh] overflow-y-auto">
      {data?.docs?.map((user) => (
        <div className="py-2 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-[50px] h-[50px] mr-4">
              <img
                src={IMAGE_PROXY(user?.data()?.photoURL) || AVATAR_DEFAULT}
                alt=""
                className="w-full h-full rounded-full"
              />
            </div>
            <div>
              <div className="text-lg text-black font-medium">
                {user?.data()?.displayName}
              </div>
            </div>
          </div>
          <div className="p-2 cursor-pointer hover:bg-gray-100 rounded-full relative group">
            <AiOutlinePlusSquare className="w-5 h-5" />
            <div
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-3 py-[2px] bg-gray-900 text-white
             font-normal rounded-lg text-sm invisible opacity-0 group-hover:visible group-hover:opacity-100"
            >
              Thêm
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddMember;
