import { FC } from "react";
import { db } from "../../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

interface RemoveMessageProps {
  setIsOpenRemoveMessage: (value: boolean) => void;
  messageRemove: string;
  conversationId: string;
}

const RemoveMessage: FC<RemoveMessageProps> = ({
  setIsOpenRemoveMessage,
  messageRemove,
  conversationId,
}) => {
  const handleRemoveMessage = () => {
    updateDoc(
      doc(
        db,
        "conversations",
        conversationId as string,
        "messages",
        messageRemove
      ),
      {
        type: "removed",
        content: "",
      }
    );
    setIsOpenRemoveMessage(false);
  };

  return (
    <div className="fixed inset-0 w-full h-full z-10 bg-[rgba(0,0,0,0.5)] text-black">
      <div className="w-full h-full relative">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] 
        h-fit bg-white rounded-lg py-5"
        >
          <div className="text-center mb-5 text-lg font-normal px-5">
            Bạn có chắn chắn muốn xoá tin nhắn này không?
          </div>
          <div className="flex items-center justify-center">
            <button
              className="px-5 py-1 bg-white text-blue-500 text-base font-medium rounded-xl mr-10"
              onClick={() => setIsOpenRemoveMessage(false)}
            >
              Huỷ
            </button>
            <button
              className="px-5 py-1 bg-blue-500 text-white text-base font-medium rounded-xl"
              onClick={handleRemoveMessage}
            >
              Xoá
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveMessage;
