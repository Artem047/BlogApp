import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";


const Root = () => {

  return  (
    <div>
      <Header />
      <div className="flex p-5">
        <div>
          <Navbar />
        </div>
        <div className="px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Root;
