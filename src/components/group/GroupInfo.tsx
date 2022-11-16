import { FC, useState } from "react";
import { ImCross } from "react-icons/im";
import { ConversationInfo } from "../../shared/types";
import ListMember from "./ListMember";
import AddMember from "./AddMember";

interface GroupInfoProps {
  conversationInfo: ConversationInfo;
  setIsOpenGroupInfo: (value: boolean) => void;
  conversationId: string;
}

const GroupInfo: FC<GroupInfoProps> = ({
  conversationInfo,
  setIsOpenGroupInfo,
  conversationId,
}) => {
  const [isShowListMember, setIsShowListMember] = useState(true);

  return (
    <div className="fixed inset-0 w-full h-full z-10 bg-[rgba(0,0,0,0.5)] text-black">
      <div className="w-full h-full relative">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] 
         bg-white rounded-lg mb-10"
        >
          <div className="flex items-center justify-between px-4 py-2 border-b-[1px] border-gray-300">
            <div></div>
            <p className="text-xl font-semibold">Thông tin thành viên</p>
            <div
              className=" cursor-pointer"
              onClick={() => setIsOpenGroupInfo(false)}
            >
              <ImCross className="w-8 h-8 rounded-full p-2 bg-gray-300 text-gray-500" />
            </div>
          </div>
          <div className="flex items-center">
            <div
              className={`w-1/2 text-center py-2 text-lg font-medium text-black cursor-pointer
              border-r-[1px] border-gray-300 ${
                isShowListMember
                  ? "bg-gray-200"
                  : "border-b-[1px] border-gray-200"
              }`}
              onClick={() => setIsShowListMember(true)}
            >
              Thành viên trong đoạn chat
            </div>
            <div
              className={`w-1/2 text-center py-2  text-lg font-medium text-black cursor-pointer
            ${
              isShowListMember
                ? "border-b-[1px] border-gray-200"
                : "bg-gray-200"
            }`}
              onClick={() => setIsShowListMember(false)}
            >
              Thêm thành viên
            </div>
          </div>
          {isShowListMember ? (
            <ListMember
              conversationInfo={conversationInfo as ConversationInfo}
            />
          ) : (
            <AddMember
              conversationId={conversationId as string}
              conversationInfo={conversationInfo}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupInfo;
