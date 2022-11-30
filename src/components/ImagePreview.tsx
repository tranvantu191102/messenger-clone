import { FC, useContext } from "react";
import { ImCross } from "react-icons/im";
import { ModalContext } from "../contexts/ModalContext";
import { IMAGE_PROXY } from "../shared/constants";

const ImagePreview: FC = () => {
  const { urlImage, setUrlImage } = useContext(ModalContext);

  return (
    <div className="fixed inset-0 w-full h-full bg-[rgba(0,0,0,0.5)] text-black z-[99999]">
      <div className="w-full h-full relative">
        <div className="flex items-center justify-between mr-10 mt-10">
          <div></div>
          <div></div>
          <div className=" cursor-pointer" onClick={() => setUrlImage("")}>
            <ImCross className="w-12 h-12 rounded-full p-2 fill-white" />
          </div>
        </div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[800px] 
        h-fit bg-white rounded-lg mb-10"
        >
          <div>
            <img src={IMAGE_PROXY(urlImage)} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
