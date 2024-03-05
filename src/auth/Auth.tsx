import { Outlet } from "react-router-dom";
import Header from "../layout/Header";
import ImageComponent from "../components/imageComponent/ImageComponent";

const Auth = () => {
  return (
    <div className="bg-[#F2F2F2] w-full h-screen relative">
      <Header />
      <ImageComponent src="/auth.png" alt="People image" className="absolute top-0 right-0 h-full" />
      <div className="px-[230px] mt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
