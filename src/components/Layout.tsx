import { FC, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import Conversation from "../pages/Conversation";
import Home from "../pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Chat from "../pages/Chat";

const Layout: FC = () => {
  const { setCurrentUser, setIsLogin, isLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, uid, photoURL, phoneNumber } = user;
        setCurrentUser({
          uid,
          email: user?.email || "",
          displayName: user?.displayName || "",
          phoneNumber: user?.phoneNumber || "",
          photoURL: user?.photoURL || "",
        });
        setDoc(doc(db, "users", uid), {
          email,
          displayName,
          uid,
          phoneNumber,
          photoURL,
        });
        setIsLogin(true);
        // navigate("/");
      } else {
        setCurrentUser(null);
        setIsLogin(false);
        navigate("/");
      }
    });
  }, []);

  // if (isLogin) {
  //   navigate("/conversation");
  // }

  useEffect(() => {
    if (isLogin) navigate("/conversation");
  }, [isLogin]);

  return (
    <>
      <div className="lg:block hidden">
        <Routes>
          {isLogin && (
            <Route path="/conversation">
              <Route index element={<Conversation />} />
              <Route path=":id" element={<Chat />} />
            </Route>
          )}
        </Routes>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <div className="lg:hidden block w-full h-screen relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ">
          <h2 className="text-center text-[32px] font-bold">Sorry!</h2>
          <p className="text-center text-[26px] font-bold">
            Website only support in PC screen!
          </p>
        </div>
      </div>
    </>
  );
};

export default Layout;
