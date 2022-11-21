import { FC } from "react";
import { MessageInfo } from "../../shared/types";
import { db } from "../../firebase/config";
import { useQueryDocument } from "../../hooks/useQueryDocument";
import { doc } from "firebase/firestore";
import Skeleton from "../Skeleton";

interface ReplyMessageProps {
  messageReply: MessageInfo;
  conversationId: string;
}

const ReplyMessage: FC<ReplyMessageProps> = ({
  messageReply,
  conversationId,
}) => {
  const document = doc(
    db,
    "conversations",
    conversationId as string,
    "messages",
    messageReply?.id as string
  );
  const { data, loading, error } = useQueryDocument(
    document,
    messageReply?.id as string
  );

  if (loading || error) {
    return (
      <div>
        <Skeleton className="w-[300xp] h-[30px]" />
      </div>
    );
  }
  return (
    <div
      className="text-gray-700 text-sm italic bg-gray-100 px-3 py-2 rounded-xl max-w-[400px] ml-16
 transform translate-y-2"
    >
      {data?.data()?.type === "removed" ? <div>Tin nhắn đã thu hồi</div> : null}
      {data?.data()?.type === "text" ? (
        <div>{data?.data()?.content}</div>
      ) : null}
    </div>
  );
};

export default ReplyMessage;
