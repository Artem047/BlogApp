import { Link, useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import Input from "../components/input/Input";
import ImageComponent from "../components/imageComponent/ImageComponent";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Login = () => {
  const {
    handleNewSignIn,
    handleNewChange,
    user,
    signInWithGoogle,
    signInWithGithub,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex text-center flex-col gap-5 items-center w-[400px]">
      <h1 className="font-bold text-4xl">Welcome Back</h1>
      <p className="text-lg">Login into your account</p>
      <div className="flex gap-4">
        <Button
          className="w-[126px] h-12 bg-[#FFFFFF] rounded-md flex justify-center items-center gap-2 border border-[#DEDEDE] cursor-pointer"
          type="button"
          onClick={signInWithGoogle}
        >
          <ImageComponent
            src="/google.svg"
            alt="Icon google"
            className="w-8 h-8"
          />
          <p className="text-base">Google</p>
        </Button>
        <Button
          className="w-[126px] h-12 bg-[#FFFFFF] rounded-md flex justify-center items-center gap-2 border border-[#DEDEDE] cursor-pointer"
          type="button"
          onClick={signInWithGithub}
        >
          <ImageComponent
            src="/github.png"
            alt="Icon google"
            className="w-8 h-8"
          />
          <p className="text-base">GitHub</p>
        </Button>
      </div>
      <div className="flex items-center w-full">
        <hr color="#DBDBDB" className="w-full h-0.5" />
        <p className="w-full">Or continue with</p>
        <hr color="#DBDBDB" className="w-full h-0.5" />
      </div>
      <form
        className="w-full flex flex-col items-center gap-4"
        onSubmit={handleNewSignIn}
      >
        <Input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleNewChange}
          className="w-full h-16 placeholder:text-lg rounded-xl outline-none text-lg px-6"
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleNewChange}
          className="w-full h-16 placeholder:text-lg rounded-xl outline-none text-lg px-6"
        />
        <div className="flex gap-2">
          <p>don’t have an account?</p>
          <Link to="/auth/register" className="text-[#00BD97]">
            Sign up!
          </Link>
        </div>
        <Button
          className="uppercase w-full h-14 bg-[#01BD97] text-white rounded-xl font-semibold text-xl"
          type="submit"
        >
          Log In
        </Button>
      </form>
    </div>
  );
};

export default Login;
