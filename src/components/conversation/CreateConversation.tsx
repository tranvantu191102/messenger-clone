import { FC, useContext, useState } from "react";
import { ImCross } from "react-icons/im";
import {
  collection,
  serverTimestamp,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { useQueryCollection } from "../../hooks/useQueryCollection";
import { AuthContext } from "../../contexts/AuthContext";
import { IMAGE_PROXY, AVATAR_DEFAULT } from "../../shared/constants";
import Skeleton from "../Skeleton";
import { THEMES } from "../../shared/constants";
import { useNavigate } from "react-router-dom";

interface CreateConversationProps {
  setIsOpenCreateConversation: (value: boolean) => void;
}
const CreateConversation: FC<CreateConversationProps> = ({
  setIsOpenCreateConversation,
}) => {
  const { currentUser } = useContext(AuthContext);
  const { loading, data } = useQueryCollection(
    "users",
    collection(db, "users")
  );
  const [userSelected, setUserSelected] = useState<string[]>([]);
  const [creating, setCreating] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSelectedUser = (id: string) => {
    if (userSelected.includes(id)) {
      setUserSelected(userSelected.filter((userId) => userId !== id));
    } else {
      setUserSelected([...userSelected, id]);
    }
  };

  const handleCreateConversation = async () => {
    try {
      if (userSelected.length === 0) return;
      setCreating(true);

      const selected = [...userSelected, currentUser?.uid].sort();

      const q = query(
        collection(db, "conversations"),
        where("users", "==", selected)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        const created = await addDoc(collection(db, "conversations"), {
          users: selected,
          group:
            selected.length > 2
              ? {
                  admin: [currentUser?.uid],
                  groupName: null,
                  groupImage: null,
                }
              : {},
          updateAt: serverTimestamp(),
          theme: THEMES[0],
        });

        setCreating(false);
        setIsOpenCreateConversation(false);
        navigate(`/conversation/${created.id}`);
      } else {
        setCreating(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full z-[999999] bg-[rgba(0,0,0,0.5)] text-black">
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
          <div className="h-[calc(100%-112px)] w-full overflow-y-auto">
            {loading ? (
              <div className="w-full">
                <div className="flex items-center justify-start px-3 py-2">
                  <Skeleton className="w-4 h-4 mr-3" />
                  <Skeleton className="w-[50px] h-[50px] rounded-full mr-4" />
                  <Skeleton className="w-[70%] h-10" />
                </div>
                <div className="flex items-center justify-start px-3 py-2">
                  <Skeleton className="w-4 h-4 mr-3" />
                  <Skeleton className="w-[50px] h-[50px] rounded-full mr-4" />
                  <Skeleton className="w-[70%] h-10" />
                </div>
              </div>
            ) : (
              data?.docs
                .filter((doc) => doc?.data().uid !== currentUser?.uid)
                .map((doc) => (
                  <div
                    className="flex items-center justify-start px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    key={doc.data()?.uid}
                    onClick={() => handleSelectedUser(doc.data()?.uid)}
                  >
                    <div className="mr-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                        checked={userSelected.includes(doc.data()?.uid)}
                        readOnly
                      />
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
                ))
            )}
          </div>
          <div className="h-[40px] w-full flex items-center justify-between px-6">
            <div className=""></div>
            <div className="mb-4">
              <button
                className={`px-4 py-2 rounded-lg bg-blue-500 text-white font-medium ${
                  userSelected.length === 0 ? "opacity-50 cursor-default" : ""
                }`}
                onClick={handleCreateConversation}
              >
                Tạo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateConversation;
