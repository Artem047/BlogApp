import { Link } from "react-router-dom";
import { PiArrowUDownLeftBold } from "react-icons/pi";

const ErrorPage = () => {
  return (
    <div className="bg-[#64FCD9] w-full h-screen flex flex-col justify-center items-center gap-20">
      <span className="text-6xl font-black">404</span>
      <img src="/error.svg" alt="" />
      <Link
        to={"/auth/register"}
      >
        <button className="flex items-center gap-2 border-b-2 border-black p-2">
          <PiArrowUDownLeftBold size={24} />
          Go Home
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
