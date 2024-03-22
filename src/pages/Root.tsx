import { Outlet, useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Navbar from "../layout/Navbar";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Root = () => {
  const { userDisplayName } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      setLoading(false);
      if (userDisplayName === null || userDisplayName === undefined) {
        navigate("/auth/register");
      } else {
        navigate("/");
      }
    }, 3000);

    return () => clearTimeout(redirectTimeout);
  }, [userDisplayName, navigate]);

  return loading ? (
    <p>loading</p>
  ) : (
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
