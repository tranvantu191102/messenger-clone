import { FC, useContext } from "react";
import { ImCross } from "react-icons/im";
import { getDocs, collection, query } from "firebase/firestore";
import { UserInfo } from "../../shared/types";
import { db } from "../../firebase/config";
import { useQueryCollection } from "../../hooks/useQueryCollection";
import { AuthContext } from "../../contexts/AuthContext";
import { IMAGE_PROXY, AVATAR_DEFAULT } from "../../shared/constants";

interface CreateConversationProps {
  setIsOpenCreateConversation: (value: boolean) => void;
}
const CreateConversation: FC<CreateConversationProps> = ({
  setIsOpenCreateConversation,
}) => {
  const { currentUser } = useContext(AuthContext);
  const { loading, data } = useQueryCollection(collection(db, "users"));

  return (
    <div className="fixed inset-0 w-full h-full z-10 bg-[rgba(0,0,0,0.5)] text-black">
      <div className="w-full h-full relative">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] 
        h-[80vh] bg-white rounded-lg"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b-[1px] border-gray-300">
            <div></div>
            <p className="text-xl font-semibold">Tạo cuộc trò chuyện</p>
            <div
              className=" cursor-pointer"
              onClick={() => setIsOpenCreateConversation(false)}
            >
              <ImCross className="w-12 h-12 rounded-full p-3 bg-gray-300 text-gray-500" />
            </div>
          </div>
          <div className="h-full w-full overflow-y-auto">
            {data?.docs
              .filter((doc) => doc?.data().uid !== currentUser?.uid)
              .map((doc) => (
                <div
                  className="flex items-center justify-start px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  key={doc.data()?.uid}
                >
                  <div className="mr-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                  </div>
                  <div className="w-[50px] h-[50px] mr-4">
                    <img
                      src={
                        doc.data()?.photoURL
                          ? IMAGE_PROXY(doc.data()?.photoURL)
                          : AVATAR_DEFAULT
                      }
                      alt=""
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <div className="text-lg font-normal text-black">
                    {doc.data()?.displayName}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateConversation;
