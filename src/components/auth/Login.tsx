import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";

import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth } from "../../firebase/config";

const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();

const Login: FC = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleLogin = async (type: string) => {
    try {
      if (type === "fb") {
        await signInWithPopup(auth, facebookProvider);
      } else {
        await signInWithPopup(auth, googleProvider);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex justify-center flex-col items-center h-screen">
      <div className="m-auto flex justify-center flex-col items-center">
        <div className="w-[75px] h-[75px]">
          <Link to="/">
            {" "}
            <img src={logo} alt="" className="w-full h-full" />
          </Link>
        </div>
        <h2 className="text-black text-[40px] font-light">Messenger</h2>
        <div className="mt-10">
          <div
            className="flex items-center justify-center px-8 py-4 border-[1px] border-gray-300
           rounded-lg cursor-pointer"
            onClick={() => handleLogin("gg")}
          >
            <FcGoogle className="text-3xl mr-2" />
            <p className="text-xl text-black font-normal">
              Đăng nhập với Google
            </p>
          </div>
          <div
            className="flex items-center justify-center px-8 py-4 border-[1px] border-gray-300 
          rounded-lg cursor-pointer mt-4"
            onClick={() => handleLogin("fb")}
          >
            <BsFacebook className="text-3xl mr-2 text-blue-500" />
            <p className="text-xl text-black font-normal">
              Đăng nhập với Facebook
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
