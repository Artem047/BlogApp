import { Outlet } from "react-router-dom";
import Header from "../layout/Header";
import Navbar from "../layout/Navbar";
import { useAuth } from "../context/AuthContext";

const Root = () => {
  const { userDisplayName } = useAuth();

  return (
    <div>
      <Header />
      {userDisplayName == null ? (
        <p>loading</p>
      ) : (
        <div className="flex p-5">
          <div>
            <Navbar />
          </div>
          <div className="px-4">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default Root;
