import { FC, useState } from "react";
import SideBar from "../components/conversation/SideBar";
import CreateConversation from "../components/conversation/CreateConversation";
import ChatHeader from "../components/chat/ChatHeader";
import ChatInput from "../components/chat/ChatInput";
import ChatView from "../components/chat/ChatView";

import { useQueryDocument } from "../hooks/useQueryDocument";
import { doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useParams } from "react-router-dom";
import { ConversationInfo } from "../shared/types";
import Profile from "../components/Profile";
import SettingConversation from "../components/SettingConversation";
import GroupInfo from "../components/group/GroupInfo";

const Chat: FC = () => {
  const [isOpenCreateConversation, setIsOpenCreateConversation] =
    useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenSettingConversation, setIsOpenSettingConversation] =
    useState(false);
  const [isOpenGroupInfo, setIsOpenGroupInfo] = useState(true);

  const { id } = useParams();

  const document = doc(db, "conversations", id as string);
  const { loading, data } = useQueryDocument(document, id as string);

  return (
    <div className="w-full bg-white h-screen">
      <div>
        <SideBar
          setIsOpenCreateConversation={setIsOpenCreateConversation}
          setIsOpenProfile={setIsOpenProfile}
        />
      </div>
      <div className="ml-[360px] h-full">
        <div className="h-full">
          <ChatHeader
            conversationInfo={data?.data() as ConversationInfo}
            setIsOpenSettingConversation={setIsOpenSettingConversation}
            setIsOpenGroupInfo={setIsOpenGroupInfo}
          />
          <ChatView />
          <ChatInput conversationInfo={data?.data() as ConversationInfo} />
        </div>
      </div>
      {isOpenCreateConversation ? (
        <CreateConversation
          setIsOpenCreateConversation={setIsOpenCreateConversation}
        />
      ) : null}
      {isOpenProfile ? <Profile setIsOpenProfile={setIsOpenProfile} /> : null}
      {isOpenSettingConversation ? (
        <SettingConversation
          setIsOpenSettingConversation={setIsOpenSettingConversation}
          conversationInfo={data?.data() as ConversationInfo}
          conversationId={id as string}
        />
      ) : null}
      {isOpenGroupInfo ? (
        <GroupInfo
          setIsOpenGroupInfo={setIsOpenGroupInfo}
          conversationInfo={data?.data() as ConversationInfo}
          conversationId={id as string}
        />
      ) : null}
    </div>
  );
};

export default Chat;
