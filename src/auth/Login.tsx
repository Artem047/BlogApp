import { Link, useNavigate } from "react-router-dom"
import Button from "../components/button/Button"
import Input from "../components/input/Input"
import ImageComponent from "../components/imageComponent/ImageComponent"
import { useAuth } from "../context/AuthContext"
import { FormEvent, useEffect } from "react"

const Login = () => {
  const {handleSignIn, handleChange, fullName} = useAuth();
  const navigate = useNavigate();


  const signIn = async (e: FormEvent<HTMLFormElement>) => {
    handleSignIn(e)
  }

  useEffect(() => {
    if (fullName != null) {
      navigate('/');
    }
  }, [fullName, navigate]);

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
      <form className="w-full flex flex-col items-center gap-4" onSubmit={signIn}>
        <Input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full h-16 placeholder:text-lg rounded-xl outline-none text-lg px-6" />
        <Input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full h-16 placeholder:text-lg rounded-xl outline-none text-lg px-6" />
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
