import { createContext, ReactNode, useState } from "react";
interface ModalContextProps {
  children: ReactNode;
}

interface ModalContextDefault {
  urlImage: string;
  setUrlImage: (value: string) => void;
  reactionsInfo: any;
  setReactionsInfo: (value: any) => void;
}

export const ModalContext = createContext<ModalContextDefault>({
  urlImage: "",
  setUrlImage: () => {},
  reactionsInfo: null,
  setReactionsInfo: () => {},
});

const ModalContextProvider = ({ children }: ModalContextProps) => {
  const [urlImage, setUrlImage] = useState("");
  const [reactionsInfo, setReactionsInfo] = useState(null);

  const value = {
    urlImage,
    setUrlImage,
    reactionsInfo,
    setReactionsInfo,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalContextProvider;
