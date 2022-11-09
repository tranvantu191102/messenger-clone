import { FC, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Register: FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorPwConfirm, setErrorPwConfirm] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (e: string) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(e);
  };

  const validatePassword = (p: string) => {
    const regexPassword = /^(?!.* ).{8,15}$/;
    return regexPassword.test(p);
  };

  const hanldeBlurEmail = (e: string) => {
    setErrorEmail(!validateEmail(e));
  };
  const hanldeBlurPassword = (e: string) => {
    setErrorPassword(!validatePassword(e));
  };

  const handleCheckPassword = (pw: string) => {
    setErrorPwConfirm(pw !== password);
  };

  useEffect(() => {
    document.title = "Register";
  }, []);

  return (
    <div className="w-full flex justify-center flex-col items-center h-screen">
      <div className="m-auto flex justify-center flex-col items-center">
        <div className="w-[75px] h-[75px]">
          <img src={logo} alt="" className="w-full h-full" />
        </div>
        <h2 className="text-black text-[40px] font-light">Messenger</h2>
        <form className="mt-8">
          <div className="flex items-center justify-center w-full">
            <div className="relative w-1/2 mr-4">
              <input
                value={email}
                type="email"
                placeholder="Email hoặc số điện thoại"
                className="px-4 w-[286px] h-11 border-[1px] border-gray-300 rounded-sm"
                onBlur={(e) => hanldeBlurEmail(e.target.value)}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errorEmail && (
                <p className="absolute -bottom-6 left-0 text-red-500 text-sm mt-2">
                  *Xin hãy nhập đúng địa chỉ email
                </p>
              )}
            </div>
            <div className="relative w-1/2">
              <input
                type="text"
                value={username}
                placeholder="Họ và tên"
                className="px-4 w-[286px] h-11 border-[1px] border-gray-300 rounded-sm"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center">
            <div className=" relative w-1/2 mr-4">
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                className="px-4 w-[286px] h-11 border-[1px] border-gray-300 rounded-sm"
                onBlur={(e) => hanldeBlurPassword(e.target.value)}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorPassword && (
                <p className="absolute -bottom-10 left-0 text-red-500 text-sm mt-2">
                  *Mật khẩu phải chứa ít nhất 8 kí tự và không có khoảng trắng.
                </p>
              )}
            </div>
            <div className="relative w-1/2">
              <input
                type="password"
                value={passwordConfirm}
                placeholder="Xác nhận lại mật khẩu"
                className="px-4 w-[286px] h-11 border-[1px] border-gray-300 rounded-sm"
                onBlur={(e) => handleCheckPassword(e.target.value)}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              {errorPwConfirm && (
                <p className="absolute -bottom-6 left-0 text-red-500 text-sm mt-2">
                  *Mật khẩu không khớp.
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-5 py-2 rounded-3xl bg-blue-500 text-white mt-10"
            >
              Đăng kí
            </button>
          </div>
          <div className="flex justify-center mt-8">
            <Link to="/login">
              <p className="hover:underline text-sm text-blue-500">
                Bạn đã có tài khoản?
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
