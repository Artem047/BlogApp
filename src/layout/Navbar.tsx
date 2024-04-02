import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { BiLogOutCircle } from "react-icons/bi";
import Button from "../components/button/Button";
import ImageComponent from "../components/imageComponent/ImageComponent";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setShow(true);
  };

  const handleClickClose = () => {
    setShow(false);
  };

  const handleLogOut = () => {
    signOut(auth).then(() => navigate('/auth/login'))
  };
  return (
    <nav className="bg-[#00BD97] flex flex-col justify-between items-center rounded-t-xl text-lg max-w-[245px] text-center pt-5 h-[600px] relative">
      <div className="absolute top-10 right-[-20px] w-8 h-8 bg-white rounded-full flex justify-center items-center">
        {show === false ? (
          <MdKeyboardArrowRight
            size={30}
            color="#00BD97"
            onClick={handleClickOpen}
            className="cursor-pointer"
          />
        ) : (
          <MdKeyboardArrowLeft
            size={30}
            color="#00BD97"
            onClick={handleClickClose}
            className="cursor-pointer"
          />
        )}
      </div>
      {show === false ? (
        <>
          <div className="px-5 flex flex-col items-center">
            <ImageComponent
              src={user?.photoURL || '/avatar.png'}
              alt="Image user"
              className="w-16 h-16 rounded-full border-4 border-white"
            />
            <p className="text-white text-xl py-5"></p>
            <div className="flex flex-col mt-7 gap-10">
              <NavLink to="/" className=" text-white rounded-md px-6 py-2">
                <AiOutlineHome size={35} />
              </NavLink>
              <NavLink
                to="/collection"
                className=" text-white rounded-md px-6 py-2"
              >
                <AiOutlineHeart size={35} />
              </NavLink>
              <NavLink
                to="/profile"
                className=" text-white rounded-md px-6 py-2"
              >
                <AiOutlineUser size={35} />
              </NavLink>
            </div>
          </div>
          <form
            className=" bg-[#00D2A8] w-full flex justify-center items-center text-white font-bold mt-20 h-12"
            onSubmit={handleLogOut}
          >
            <Button type="submit">
              <BiLogOutCircle size={35} />
            </Button>
          </form>
        </>
      ) : (
        <>
          <div className="px-5 flex flex-col justify-center items-center">
            <ImageComponent
              src={user?.photoURL || '/avatar.png'}
              alt="Image user"
              className="w-20 h-20 rounded-full border-4 border-white"
            />
            <p className="text-white text-xl py-5">@{user?.displayName || 'Anon'}</p>
            <div className="flex flex-col mt-7 gap-10">
              <NavLink to="/" className="nav_link">
                <AiOutlineHome size={35} />
                Home
              </NavLink>
              <NavLink to="/collection" className="nav_link">
                <AiOutlineHeart size={35} />
                Collection
              </NavLink>
              <NavLink to="/profile" className="nav_link">
                <AiOutlineUser size={35} />
                Profile
              </NavLink>
            </div>
          </div>
          <form
            className=" bg-[#00D2A8] w-full py-4 text-white font-bold mt-20"
            // onSuonbmit={signOut}
          >
            <Button type="button" className="uppercase" onClick={handleLogOut}>
              logout
            </Button>
          </form>
        </>
      )}
    </nav>
  );
};

export default Navbar;
