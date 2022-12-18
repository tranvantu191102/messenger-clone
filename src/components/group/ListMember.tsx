import { FC } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FiUserMinus, FiUserPlus } from "react-icons/fi";
import { useInfoUsers } from "../../hooks/useInfoUsers";
import { AVATAR_DEFAULT, IMAGE_PROXY } from "../../shared/constants";
import { ConversationInfo } from "../../shared/types";
import { db } from "../../firebase/config";
import { updateDoc, doc, arrayRemove } from "firebase/firestore";

interface ListMemberProps {
  conversationInfo: ConversationInfo;
  conversationId: string;
  setIsOpenGroupInfo: (value: boolean) => void;
}

const ListMember: FC<ListMemberProps> = ({
  conversationInfo,
  conversationId,
  setIsOpenGroupInfo,
}) => {
  const { data: users } = useInfoUsers(conversationInfo?.users);

  const handleLeaveGroup = (userId: string) => {
    updateDoc(doc(db, "conversations", conversationId as string), {
      "group.admin": arrayRemove(userId as string),
      users: arrayRemove(userId as string),
    });
    setIsOpenGroupInfo(false);
  };

  const handleAddAdmin = (userId: string) => {
    updateDoc(doc(db, "conversations", conversationId as string), {
      "group.admin": [...(conversationInfo?.group?.admin as string[]), userId],
    });
    setIsOpenGroupInfo(false);
  };

  return (
    <div className="py-3 px-5 h-[60vh] overflow-y-auto">
      {users?.map((user) => (
        <div className="flex items-center justify-between py-2 " key={user?.id}>
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
              <div className="text-sm text-gray-700">
                {conversationInfo?.group?.admin?.includes(user?.id)
                  ? "Quản trị viên"
                  : ""}
              </div>
            </div>
          </div>
          {!conversationInfo?.group?.admin?.includes(user?.id) ? (
            <div className="p-2 bg-transparent rounded-full hover:bg-gray-100 cursor-pointer relative group">
              <BsThreeDots className="w-5 h-5 fill-gray-700" />
              <div
                className="absolute top-4 right-8 invisible opacity-0 shadow-lg shadow-gray-500/20
        group-hover:visible group-hover:opacity-100 transition-all duration-75 w-[220px] bg-white border-[1px] 
        border-gray-100 rounded-lg"
              >
                <div
                  className="flex items-center py-2 px-3 hover:bg-gray-100"
                  onClick={() => handleAddAdmin(user?.id)}
                >
                  <FiUserPlus className="w-5 h-5 mr-4" />
                  <div className="text-base font-normal text-black">
                    Thêm quản trị viên
                  </div>
                </div>
                <div
                  className="flex items-center py-2 px-3  hover:bg-gray-100"
                  onClick={() => handleLeaveGroup(user?.id)}
                >
                  <FiUserMinus className="w-5 h-5 mr-4" />
                  <div className="text-base font-normal text-black">
                    Xoá khỏi nhóm
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default ListMember;
