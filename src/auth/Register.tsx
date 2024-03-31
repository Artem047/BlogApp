import { Link } from "react-router-dom";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import ImageComponent from "../components/imageComponent/ImageComponent";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const {handleSignUp, handleChange} = useAuth();

  return (
    <div className="flex text-center flex-col gap-5 items-center w-[400px]">
      <h1 className="font-bold text-4xl">Create Your Accout</h1>
      <p className="text-lg">Sign up into your account</p>
      <Button
        className="w-[126px] h-12 bg-[#FFFFFF] rounded-md flex justify-center items-center gap-2 border border-[#DEDEDE] cursor-pointer"
        type="button"
      >
        <ImageComponent src="/github.png" alt="Icon google" className="w-8 h-8" />
        <p className="text-base">GitHub</p>
      </Button>
      <div className="flex items-center w-full">
        <hr color="#DBDBDB" className="w-full h-0.5" />
        <p className="w-full">Or continue with</p>
        <hr color="#DBDBDB" className="w-full h-0.5" />
      </div>
      <form
        className="w-full flex flex-col items-center gap-4"
        onSubmit={handleSignUp}
      >
        <Input
          name="fullname"
          type="fullname"
          placeholder="@fullname"
          onChange={handleChange}
          className="w-full h-16 placeholder:text-lg rounded-xl outline-none text-lg px-6"
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full h-16 placeholder:text-lg rounded-xl outline-none text-lg px-6"
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full h-16 placeholder:text-lg rounded-xl outline-none text-lg px-6"
        />
        <div className="flex gap-2">
          <p>have an account?</p>
          <Link to="/auth/login" className="text-[#00BD97]">
            Sign in!
          </Link>
        </div>
        <Button
          className="uppercase w-full h-14 bg-[#01BD97] text-white rounded-xl font-semibold text-xl"
          type="submit"
        >
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default Register;
