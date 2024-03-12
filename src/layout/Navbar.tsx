import { NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlinePlusCircle,
  AiOutlineUser,
  AiOutlineHeart
} from "react-icons/ai";
import Button from "../components/button/Button";
import ImageComponent from "../components/imageComponent/ImageComponent";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate()

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate('/auth/register');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="bg-[#00BD97] flex flex-col justify-between items-center rounded-t-xl text-lg w-[245px] text-center pt-5">
      <ImageComponent src="/people.png" alt="Image user" className="w-20 h-20 rounded-full border-4 border-white" />
      <p className="text-white text-xl py-5">{user?.displayName}</p>
      <div className="flex flex-col mt-7 gap-10">
        <NavLink to="/" className="nav_link">
          <AiOutlineHome size={35} />
          Home
        </NavLink>
        <NavLink to="/collection" className="nav_link">
          <AiOutlineHeart size={35} />
          Collection
        </NavLink>
        <NavLink to="/createpost" className="nav_link">
          <AiOutlinePlusCircle size={35} />
          CreatePost
        </NavLink>
        <NavLink to="/profile" className="nav_link">
          <AiOutlineUser size={35} />
          Profile
        </NavLink>
      </div>
      <Button
        className="uppercase bg-[#00D2A8] w-full py-4 text-white font-bold mt-20"
        type="button"
        onClick={handleLogOut}
      >
        logout
      </Button>
    </nav>
  );
};

export default Navbar;
