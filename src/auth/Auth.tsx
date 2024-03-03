import { Outlet } from "react-router-dom";
import Navbar from "../layout/Navbar";

const Auth = () => {
  return (
    <div className="bg-[#F2F2F2] w-full h-screen relative">
      <Navbar />
      <img src="/auth.png" alt="" className="absolute top-0 right-0 h-full" />
      <div className="px-[230px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
