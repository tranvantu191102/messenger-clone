import { createContext, ReactNode, useState } from "react";
import { UserInfo } from "../shared/types";
interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextDefault {
  userId: string;
  currentUser: undefined | null | UserInfo;
  setCurrentUser: (value: UserInfo | null) => void;
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

const userInfoDefault: UserInfo = {
  email: "",
  phoneNumber: "",
  photoURL: "",
  uid: "",
  displayName: "",
};

export const AuthContext = createContext<AuthContextDefault>({
  userId: "",
  currentUser: userInfoDefault,
  setCurrentUser: () => {},
  isLogin: false,
  setIsLogin: () => {},
});

const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [userId, setUserId] = useState("");
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const value = {
    userId,
    setUserId,
    currentUser,
    setCurrentUser,
    isLogin,
    setIsLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
