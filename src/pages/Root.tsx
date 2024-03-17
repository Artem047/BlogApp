import { Outlet, useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Navbar from "../layout/Navbar";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Root = () => {
  const { userDisplayName } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDisplayName) {
      navigate("/auth/register");
    }
  }, [userDisplayName, navigate]);

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
