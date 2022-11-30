import { FC, useContext } from "react";
import { ConversationInfo, MessageInfo } from "../../shared/types";
import { REACTIONS_IMG } from "../../shared/constants";
import { db } from "../../firebase/config";
import { updateDoc, deleteField, doc } from "firebase/firestore";
import { ModalContext } from "../../contexts/ModalContext";

interface ReactionMessageStatusProps {
  messageId: string;
  conversationId: string;
  messagesInfo: MessageInfo;
  conversationInfo: ConversationInfo;
}

const ReactionMessageStatus: FC<ReactionMessageStatusProps> = ({
  conversationId,
  messageId,
  messagesInfo,
  conversationInfo,
}) => {
  const { setReactionsInfo } = useContext(ModalContext);

  const handleRemoveReaction = () => {
    updateDoc(doc(db, "conversations", conversationId, "messages", messageId), {
      reactions: deleteField(),
    });
  };

  return (
    <div className="cursor-pointer">
      {conversationInfo.users.length === 2 ? (
        <div
          className="p-1  bg-white rounded-lg flex items-center justify-center"
          onClick={handleRemoveReaction}
        >
          <img
            src={REACTIONS_IMG[Object.entries(messagesInfo?.reactions)[0][1]]}
            alt=""
            className="w-4 h-4 "
          />
        </div>
      ) : (
        <div
          className="flex items-center justify-center bg-white rounded-lg px-1"
          onClick={() => setReactionsInfo(messagesInfo?.reactions)}
        >
          {Object.entries(
            Object.entries(messagesInfo?.reactions).reduce(
              (acc, [key, value]) => {
                acc[value] = (acc[value] || 0) + 1;
                return acc;
              },
              {} as { [key: number]: number }
            )
          )
            .sort(([key1, val1], [key2, val2]) => val1 - val2)
            .slice(0, 3)
            .reverse()
            .map(([key, val]) => (
              <div
                className="  rounded-lg flex items-center justify-center"
                key={key}
              >
                <img
                  src={REACTIONS_IMG[Number(key)]}
                  alt=""
                  className="w-4 h-4"
                />
              </div>
            ))}
          {Object.entries(messagesInfo.reactions).length !== 1 ? (
            <div className="text-black text-sm ml-1">
              {Object.entries(messagesInfo.reactions).length}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ReactionMessageStatus;
