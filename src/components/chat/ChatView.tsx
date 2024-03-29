import { FC, useState, useContext, useRef, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useQueryCollection } from "../../hooks/useQueryCollection";
import { ConversationInfo, MessageInfo } from "../../shared/types";
import RightMessages from "../messages/RightMessages";
import LeftMessages from "../messages/LeftMessages";
import { AuthContext } from "../../contexts/AuthContext";

import { db } from "../../firebase/config";
import { query, collection, orderBy, limitToLast } from "firebase/firestore";

interface ChatViewProps {
  conversationInfo: ConversationInfo;
  conversationId: string;
  handleOpenRemoveMessage: (value: string) => void;
  setMessageReply: (value: any) => void;
  messageReply: any;
}

const ChatView: FC<ChatViewProps> = ({
  conversationInfo,
  conversationId,
  handleOpenRemoveMessage,
  setMessageReply,
  messageReply,
}) => {
  const [limitData, setLimitData] = useState<number>(11);
  const { currentUser } = useContext(AuthContext);

  const scrollBottomRef = useRef<HTMLDivElement>(null);
  const isWindowFocus = useRef<boolean>(true);

  const { data, loading, error } = useQueryCollection(
    `${conversationId}/${limitData}`,
    query(
      collection(db, "conversations", conversationId as string, "messages"),
      orderBy("createdAt"),
      limitToLast(limitData)
    )
  );

  useEffect(() => {
    scrollBottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

    setTimeout(() => {
      scrollBottomRef.current?.scrollIntoView();
    }, 100);
  }, [data?.docs?.slice(-1)?.[0]?.id || ""]);

  useEffect(() => {
    const focusListener = () => {
      isWindowFocus.current = true;
    };

    const blurListener = () => {
      isWindowFocus.current = false;
    };

    window.addEventListener("focus", focusListener);
    window.addEventListener("blur", blurListener);

    return () => {
      window.removeEventListener("focus", focusListener);
      window.removeEventListener("blur", blurListener);
    };
  }, []);

  //<div className="h-[calc(100vh-144px)]">ChatView</div>
  return (
    <InfiniteScroll
      dataLength={(data?.size as number) || 0}
      next={() => setLimitData(limitData + 11)}
      hasMore={((data?.size as number) || 0) >= limitData}
      style={{ display: "flex", flexDirection: "column-reverse" }}
      inverse={true}
      loader={<h4>Loading...</h4>}
      height={`${messageReply ? "calc(100vh - 208px)" : "calc(100vh - 144px)"}`}
    >
      <div
        className={`${
          data?.docs?.length === 0
            ? "h-full overflow-auto flex flex-col items-stretch"
            : ""
        }`}
      >
        {data?.docs?.length === 0 ? (
          <div className="flex items-center justify-center text-center mt-10 text-xl font-normal text-black">
            Không có tin nhắn nào <br />
            Hãy bắt đầu cuộc trò chuyện.
          </div>
        ) : (
          data?.docs?.map((message, index) => (
            <div key={message?.id}>
              {message?.data()?.sender === currentUser?.uid ? (
                <RightMessages
                  messagesInfo={message?.data() as MessageInfo}
                  messageId={message?.id as string}
                  conversationInfo={conversationInfo as ConversationInfo}
                  handleOpenRemoveMessage={handleOpenRemoveMessage}
                  setMessageReply={setMessageReply}
                  conversationId={conversationId as string}
                />
              ) : (
                <LeftMessages
                  messagesInfo={message?.data() as MessageInfo}
                  conversationInfo={conversationInfo}
                  getAvatar={
                    data?.docs?.[index]?.data()?.sender !==
                    data?.docs?.[index + 1]?.data()?.sender
                  }
                  setMessageReply={setMessageReply}
                  messageId={message?.id as string}
                  conversationId={conversationId as string}
                />
              )}
            </div>
          ))
        )}
        <div ref={scrollBottomRef}></div>
      </div>
    </InfiniteScroll>
    // <div className="h-[calc(100vh-144px)]">ChatView</div>
  );
};

export default ChatView;
