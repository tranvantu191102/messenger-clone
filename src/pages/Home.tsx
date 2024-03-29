import { FC, useContext, useEffect } from "react";
import HeaderHomePage from "../components/header/HeaderHomePage";
import { AuthContext } from "../contexts/AuthContext";

import bannerImage from "../assets/banner.png";
import { Link } from "react-router-dom";

const Home: FC = () => {
  const { isLogin } = useContext(AuthContext);
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <div className="w-full">
      <HeaderHomePage />
      <div className="w-full flex justify-center">
        <div className="flex items-start  justify-center mt-[100px] max-w-[1195px] px-10">
          <div className="w-1/2">
            <h1 className="text-header text-8xl font-semibold text-transparent py-3">
              Tụ họp <br></br> mọi lúc, mọi nơi
            </h1>
            <p className="text-xl text-gray-700 mt-2 font-normal">
              Với Messenger, việc kết nối với những người mình yêu mến thật đơn
              giản và thú vị.
            </p>
            <div>
              {!isLogin ? (
                <Link to="/login">
                  <button className="py-5 px-16 rounded-3xl text-white bg-blue-500 font-medium text-2xl mt-5">
                    Đăng nhập
                  </button>
                </Link>
              ) : (
                <Link to="/conversation">
                  <button className="py-5 px-16 rounded-3xl text-white bg-blue-500 font-medium text-2xl mt-5">
                    Bắt đầu cuộc trò chuyện
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="w-1/2">
            <img src={bannerImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
