import { FC, useEffect, useState, useContext } from "react";
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
  const { setCurrentUser } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(false);
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
        // navigate("/conversation");
      } else {
        setCurrentUser(null);
        setIsLogin(false);
        navigate("/");
      }
    });
  }, []);

  return (
    <div>
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
  );
};

export default Layout;
