import { FC, useContext } from "react";
import { ImCross } from "react-icons/im";
import { AuthContext } from "../contexts/AuthContext";
import { AVATAR_DEFAULT, IMAGE_PROXY } from "../shared/constants";

interface ProfileProps {
  setIsOpenProfile: (value: boolean) => void;
}

const Profile: FC<ProfileProps> = ({ setIsOpenProfile }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="fixed inset-0 w-full h-full z-10 bg-[rgba(0,0,0,0.5)] text-black">
      <div className="w-full h-full relative">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] 
        h-[50vh] bg-white rounded-lg"
        >
          <div className="flex items-center justify-between px-4 py-2 border-b-[1px] border-gray-300">
            <div></div>
            <p className="text-xl font-semibold">Thông tin cá nhân</p>
            <div
              className=" cursor-pointer"
              onClick={() => setIsOpenProfile(false)}
            >
              <ImCross className="w-8 h-8 rounded-full p-2 bg-gray-300 text-gray-500" />
            </div>
          </div>
          <div>
            <div className="flex items-start justify-start mt-10">
              <div className="w-1/3 flex justify-end mr-4">
                <img
                  src={
                    IMAGE_PROXY(currentUser?.photoURL as string) ||
                    AVATAR_DEFAULT
                  }
                  alt=""
                  className="w-[120px] h-[120px] rounded-full"
                />
              </div>
              <div className="w-2/3">
                <h4 className="text-black font-semibold text-lg">
                  {currentUser?.displayName as string}
                </h4>
                <div>{`Email: ${
                  (currentUser?.email as string) || "None"
                }`}</div>
                <div>{`Phone number: ${
                  (currentUser?.phoneNumber as string) || "None"
                }`}</div>
              </div>
            </div>
            <div className="w-full px-5 text-center text-red-500 mt-5">
              Cập nhật tài khoản google hoặc facebook để thay đổi ảnh đại diện
              hay tên hiển thị.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
