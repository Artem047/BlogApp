import { Link } from "react-router-dom";
import Input from "../components/Input";

const Register = () => {
  return (
    <div className="flex text-center flex-col gap-5 items-center w-[400px]">
      <h1 className="font-bold text-4xl">Create Your Accout</h1>
      <p className="text-lg">Sign up into your account</p>
      <button className="w-[126px] h-12 bg-[#FFFFFF] rounded-md flex justify-center items-center gap-2 border border-[#00BD97]">
        <img src="/google.svg" alt="" />
        <p className="text-base">Google</p>
      </button>
      <div className="flex items-center w-full">
        <hr color="#DBDBDB" className="w-full h-0.5" />
        <p className="w-full">Or continue with</p>
        <hr color="#DBDBDB" className="w-full h-0.5" />
      </div>
      <form className="w-full flex flex-col items-center gap-4">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <div className="flex gap-2">
            <p>have an account?</p>
            <Link to='/auth/login' className="text-[#00BD97]">Sign in!</Link>
        </div>
        <button type="submit" className="uppercase w-full h-14 bg-[#01BD97] text-white rounded-xl font-semibold text-xl">
            Sign up
        </button>
      </form>
    </div>
  );
};

export default Register;
