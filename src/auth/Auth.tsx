import { Outlet } from "react-router-dom";
import Header from "../layout/Header";

const Auth = () => {
  return (
    <div className="bg-[#F2F2F2] w-full h-screen relative">
      <Header />
      <img src="/auth.png" alt="" className="absolute top-0 right-0 h-full" />
      <div className="px-[230px] mt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
