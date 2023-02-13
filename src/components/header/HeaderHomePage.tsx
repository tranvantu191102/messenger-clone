import { FC, useEffect, useRef } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { headerData } from "../../assets/header-data/header-data";

const HeaderHomePage: FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const listener = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef?.current?.classList.add("shrink_header");
      } else {
        headerRef?.current?.classList.remove("shrink_header");
      }
    };
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  return (
    <header
      className="w-full fixed top-0 left-1/2 -translate-x-1/2 bg-white "
      ref={headerRef}
    >
      <div className="w-full flex justify-center">
        <div className="max-w-[1195px] w-full  h-[100px] flex items-center justify-between">
          <div className="w-10 h-10">
            <Link to="/">
              {" "}
              <img src={logo} alt="" className="w-full h-full" />
            </Link>
          </div>
          <ul className="flex items-center ">
            {headerData.map((item, index) => (
              <li
                key={index}
                className="py-2 px-3 mr-2 font-medium text-lg cursor-pointer relative underline_header hover:before:scale-100
                "
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default HeaderHomePage;
