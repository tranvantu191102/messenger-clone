import { createContext, ReactNode, useState } from "react";
import { UserInfo } from "../shared/types";
interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextDefault {
  userId: string;
  currentUser: undefined | null | UserInfo;
  setCurrentUser: (value: UserInfo | null) => void;
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
});

const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [userId, setUserId] = useState("");
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);

  const value = {
    userId,
    setUserId,
    currentUser,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
