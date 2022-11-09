import { FC, useState } from "react";
import SideBar from "../components/conversation/SideBar";
import CreateConversation from "../components/conversation/CreateConversation";
const Conversation: FC = () => {
  const [isOpenCreateConversation, setIsOpenCreateConversation] =
    useState(false);

  return (
    <div className="w-full bg-white h-screen">
      <div>
        <SideBar setIsOpenCreateConversation={setIsOpenCreateConversation} />
      </div>
      <div className="ml-[360px] h-full">
        <div className="w-full flex items-center justify-center h-full">
          <p className="m-auto text-6xl font-bold text-header text-transparent text-center px-24">
            Chọn cuộc trò chuyện để bắt đầu.
          </p>
        </div>
      </div>
      {isOpenCreateConversation && (
        <CreateConversation
          setIsOpenCreateConversation={setIsOpenCreateConversation}
        />
      )}
    </div>
  );
};

export default Conversation;
