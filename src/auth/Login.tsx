import { Link, useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import Input from "../components/input/Input";
import ImageComponent from "../components/imageComponent/ImageComponent";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Login = () => {
  const { signInpWithEmailAndPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInpWithEmailAndPassword(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex text-center flex-col gap-5 items-center w-[400px]">
      <h1 className="font-bold text-4xl">Welcome Back</h1>
      <p className="text-lg">Login into your account</p>
      <Button
        className="w-[126px] h-12 bg-[#FFFFFF] rounded-md flex justify-center items-center gap-2 border border-[#00BD97]"
        type="button"
      >
        <ImageComponent src="/google.svg" alt="Icon google" />
        <p className="text-base">Google</p>
      </Button>
      <div className="flex items-center w-full">
        <hr color="#DBDBDB" className="w-full h-0.5" />
        <p className="w-full">Or continue with</p>
        <hr color="#DBDBDB" className="w-full h-0.5" />
      </div>
      <form className="w-full flex flex-col items-center gap-4">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
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
          onClick={handleSignIn}
        >
          Log In
        </Button>
      </form>
    </div>
  );
};

export default Login;
