import { FC, useContext } from "react";
import { ImCross } from "react-icons/im";
import { ModalContext } from "../contexts/ModalContext";

import { useInfoUsers } from "../hooks/useInfoUsers";
import { AVATAR_DEFAULT, IMAGE_PROXY } from "../shared/constants";
import { REACTIONS_IMG } from "../shared/constants";
import Skeleton from "./Skeleton";

const ReactionsInfo: FC = () => {
  const { reactionsInfo, setReactionsInfo } = useContext(ModalContext);

  const { data, loading } = useInfoUsers(Object.keys(reactionsInfo));

  return (
    <div className="fixed inset-0 w-full h-full bg-[rgba(0,0,0,0.5)] text-black z-[99999]">
      <div className="w-full h-full relative">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] 
        h-[500px] bg-white rounded-lg mb-10 "
        >
          <div className="flex items-center justify-between px-4 py-2 border-b-[1px] border-gray-300">
            <div></div>
            <p className="text-xl font-semibold">Cảm xúc về tin nhắn</p>
            <div
              className=" cursor-pointer"
              onClick={() => setReactionsInfo(null)}
            >
              <ImCross className="w-8 h-8 rounded-full p-2 bg-gray-300 text-gray-500" />
            </div>
          </div>
          {loading ? (
            <div>
              <div className="flex items-center px-4 py-2">
                <Skeleton className="w-[50px] h-[50px] rounded-full mr-4" />
                <Skeleton className="w-[200px] h-[20px] " />
              </div>
              <div className="flex items-center px-4 py-2">
                <Skeleton className="w-[50px] h-[50px] rounded-full mr-4" />
                <Skeleton className="w-[200px] h-[20px] " />
              </div>
            </div>
          ) : (
            <div className="h-full overflow-y-auto">
              {data?.map((user) => (
                <div className="flex items-center justify-between px-4 py-2">
                  <div className="flex items-center">
                    <img
                      src={
                        IMAGE_PROXY(user?.data()?.photoURL) || AVATAR_DEFAULT
                      }
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-4"
                    />
                    <div className="text-base text-black font-medium">
                      {user?.data()?.displayName}
                    </div>
                  </div>
                  <div>
                    <img
                      src={REACTIONS_IMG[Number(reactionsInfo[user?.id])]}
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReactionsInfo;
