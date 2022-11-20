import { FC, useContext } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { auth, db } from "../../firebase/config";
import { query, collection, where, orderBy } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { IMAGE_PROXY } from "../../shared/constants";
import { useQueryCollection } from "../../hooks/useQueryCollection";

import avatarDefault from "../../assets/user.png";
import SelectedUser from "./SelectedUser";
import { ConversationInfo } from "../../shared/types";

interface SideBarProps {
  setIsOpenCreateConversation: (value: boolean) => void;
  setIsOpenProfile: (value: boolean) => void;
}

const SideBar: FC<SideBarProps> = ({
  setIsOpenCreateConversation,
  setIsOpenProfile,
}) => {
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const { loading, data } = useQueryCollection(
    "coversations",
    query(
      collection(db, "conversations"),
      orderBy("updateAt", "desc"),
      where("users", "array-contains", currentUser?.uid)
    )
  );

  const handleLogOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-[360px] h-screen border-r-[1px] border-gray-300">
      <div className="flex items-center justify-between px-4 py-2 border-b-[1px] border-gray-300">
        <h3 className="text-3xl font-bold text-black">Chat</h3>
        <div className="flex items-center">
          <div
            className="mr-5 relative group"
            onClick={() => setIsOpenCreateConversation(true)}
          >
            <BsPencilSquare className="w-14 h-14 p-3 bg-white hover:bg-gray-100 cursor-pointer rounded-3xl " />
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 px-4 py-1 bg-gray-800 text-white font-normal
             rounded-lg min-w-[185px] invisible opacity-0 pointer-events-none group-hover:visible group-hover:opacity-100
             group-hover:pointer-events-auto transition-all duration-100"
            >
              Tạo cuộc trò chuyện
            </div>
          </div>
          <div className="w-[50px] h-[50px] rounded-full bg-cover cursor-pointer relative group">
            <img
              src={
                currentUser?.photoURL
                  ? IMAGE_PROXY(currentUser?.photoURL)
                  : avatarDefault
              }
              alt=""
              className="w-full h-full rounded-full"
            />
            <div
              className="absolute top-[calc(100%+10px)] right-0 min-w-[200px] bg-gray-800 text-white 
            rounded-lg invisible opacity-0 pointer-events-none group-hover:visible group-hover:opacity-100
            group-hover:pointer-events-auto transition-all duration-100 py-2"
            >
              <div
                className="flex items-center justify-start py-3 px-2 hover:opacity-90"
                onClick={() => setIsOpenProfile(true)}
              >
                <AiOutlineUser className="mr-2 w-6 h-6" />
                <span className="text-xl font-light">Thông tin cá nhân</span>
              </div>
              <div
                className="flex items-center justify-start py-3 px-2 hover:opacity-90"
                onClick={handleLogOut}
              >
                <AiOutlineLogout className="mr-2 w-6 h-6" />
                <span className="text-xl font-light">Đăng xuất</span>
              </div>
              <div
                className="absolute w-6 h-6 bg-gray-800 -top-1 right-3 transform rotate-45 shadow-xl 
              shadow-gray-500/40 z-[-1]"
              ></div>
              <div className="absolute w-full h-6 -top-5 right-0  z-[1] bg-transparent"></div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {data?.empty ? (
          <div className="w-full flex flex-col items-center justify-center mt-8">
            <h4 className="text-xl font-medium">
              Không có cuộc trò chuyện nào!
            </h4>
            <button
              className="px-5 py-2 rounded-lg bg-blue-500 mt-6 text-white font-medium"
              onClick={() => setIsOpenCreateConversation(true)}
            >
              Tạo mới
            </button>
          </div>
        ) : (
          <div>
            {data?.docs.map((doc) => (
              <div key={doc.id}>
                <SelectedUser
                  conversationInfo={doc.data() as ConversationInfo}
                  conversationId={doc?.id as string}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
