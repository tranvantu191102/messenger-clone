import { FC } from "react";
import { ImCross } from "react-icons/im";

interface RemoveMessageProps {
  setIsOpenRemoveMessage: (value: boolean) => void;
}

const RemoveMessage: FC<RemoveMessageProps> = ({ setIsOpenRemoveMessage }) => {
  return (
    <div className="fixed inset-0 w-full h-full z-10 bg-[rgba(0,0,0,0.5)] text-black">
      <div className="w-full h-full relative">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] 
        h-fit bg-white rounded-lg py-5"
        >
          <div className="text-center mb-5 text-lg font-normal">
            Bạn có chắn chắn muốn xoá không?
          </div>
          <div className="flex items-center justify-center">
            <button
              className="px-5 py-1 bg-gray-600 text-white text-base font-medium rounded-xl mr-10"
              onClick={() => setIsOpenRemoveMessage(false)}
            >
              Huỷ
            </button>
            <button className="px-5 py-1 bg-red-600 text-white text-base font-medium rounded-xl">
              Xoá
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveMessage;
