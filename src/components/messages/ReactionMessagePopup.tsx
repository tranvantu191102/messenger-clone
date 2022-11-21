import { FC, useContext } from "react";
import { REACTIONS_IMG } from "../../shared/constants";
import { AuthContext } from "../../contexts/AuthContext";
import { db } from "../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

interface ReactionMessagePopupProps {
  conversationId: string;
  messageId: string;
}

const ReactionMessagePopup: FC<ReactionMessagePopupProps> = ({
  conversationId,
  messageId,
}) => {
  const { currentUser } = useContext(AuthContext);

  const handleReactionMessage = (index: number) => {
    updateDoc(doc(db, "conversations", conversationId, "messages", messageId), {
      [`reactions.${currentUser?.uid}`]: index,
    });
  };

  return (
    <div
      className="flex items-center justify-center px-4 py-2 rounded-lg shadow-lg shadow-gray-500/50 w-full 
    bg-white"
    >
      {REACTIONS_IMG.map((item, index) => (
        <div
          key={index}
          className="mr-3 w-8 h-8"
          onClick={() => handleReactionMessage(index)}
        >
          <img src={item} alt="" className="w-full h-full " />
        </div>
      ))}
    </div>
  );
};

export default ReactionMessagePopup;
