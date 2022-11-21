import { FC, useState, useEffect } from "react";
import SideBar from "../components/conversation/SideBar";
import CreateConversation from "../components/conversation/CreateConversation";
import ChatHeader from "../components/chat/ChatHeader";
import ChatInput from "../components/chat/ChatInput";
import ChatView from "../components/chat/ChatView";
import Skeleton from "../components/Skeleton";

import { useQueryDocument } from "../hooks/useQueryDocument";
import { doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useParams } from "react-router-dom";
import { ConversationInfo, MessageInfo } from "../shared/types";
import Profile from "../components/Profile";
import SettingConversation from "../components/SettingConversation";
import GroupInfo from "../components/group/GroupInfo";
import RemoveMessage from "../components/messages/RemoveMessage";

const Chat: FC = () => {
  const [isOpenCreateConversation, setIsOpenCreateConversation] =
    useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenSettingConversation, setIsOpenSettingConversation] =
    useState(false);
  const [isOpenGroupInfo, setIsOpenGroupInfo] = useState(false);
  const [isOpenRemoveMessage, setIsOpenRemoveMessage] = useState(false);
  const [messageRemove, setMessageRemove] = useState("");
  const [messageReply, setMessageReply] = useState<any>(null);

  const handleOpenRemoveMessage = (messageId: string) => {
    setIsOpenRemoveMessage(true);
    setMessageRemove(messageId);
  };

  const { id } = useParams();

  const document = doc(db, "conversations", id as string);
  const { loading, data } = useQueryDocument(document, id as string);

  useEffect(() => {
    setMessageReply(null);
  }, [id as string]);

  return (
    <div className="w-full bg-white h-screen">
      <div>
        <SideBar
          setIsOpenCreateConversation={setIsOpenCreateConversation}
          setIsOpenProfile={setIsOpenProfile}
        />
      </div>
      <div className="ml-[360px] h-full">
        {loading ? (
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
        ) : (
          <div className="h-full">
            <ChatHeader
              conversationInfo={data?.data() as ConversationInfo}
              setIsOpenSettingConversation={setIsOpenSettingConversation}
              setIsOpenGroupInfo={setIsOpenGroupInfo}
            />
            <ChatView
              conversationInfo={data?.data() as ConversationInfo}
              conversationId={data?.id as string}
              handleOpenRemoveMessage={handleOpenRemoveMessage}
              setMessageReply={setMessageReply}
              messageReply={messageReply as any}
            />
            <ChatInput
              conversationInfo={data?.data() as ConversationInfo}
              conversationId={data?.id as string}
              messageReply={messageReply as any}
              setMessageReply={setMessageReply}
            />
          </div>
        )}
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
      {isOpenRemoveMessage ? (
        <RemoveMessage
          setIsOpenRemoveMessage={setIsOpenRemoveMessage}
          messageRemove={messageRemove as string}
          conversationId={id as string}
        />
      ) : null}
    </div>
  );
};

export default Chat;
