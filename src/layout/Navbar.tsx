import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlinePlusCircle,
  AiOutlineUser,
} from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import Button from "../components/button/Button";

const Navbar = () => {
  return (
    <nav className="bg-[#00BD97] flex flex-col justify-between items-center rounded-t-xl text-lg w-[245px] text-center pt-5">
      <img
        src="/people.jpeg"
        alt=""
        className="w-20 h-20 rounded-full border-4 border-white"
      />
      <p className="text-white text-xl py-5">Manish Prajapati</p>
      <div className="flex flex-col mt-7 gap-10">
        <Link to="/" className="nav_link">
          <AiOutlineHome size={35} />
          Home
        </Link>
        <Link to="/collection" className="nav_link">
          <FaRegBookmark size={28} />
          Collection
        </Link>
        <Link to="/createpost" className="nav_link">
          <AiOutlinePlusCircle size={35} />
          CreatePost
        </Link>
        <Link to="/profile" className="nav_link">
          <AiOutlineUser size={35} />
          Profile
        </Link>
      </div>
      <Button
        className="uppercase bg-[#00D2A8] w-full py-4 text-white font-bold mt-20"
        type="button"
      >
        logout
      </Button>
    </nav>
  );
};

export default Navbar;
