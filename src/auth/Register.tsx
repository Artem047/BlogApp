const Register = () => {
  return (
    <div className="flex text-center flex-col items-center text-4xl w-[400px]">
      <h1 className="font-bold">Create Your Accout</h1>
      <p className="text-lg py-2">Sign up into your account</p>
      <button className="w-[126px] h-12 bg-[#FFFFFF] rounded-md mt-8 flex justify-center items-center gap-2 border border-[#00BD97]">
        <img src="/google.png" alt="" />
        <p className="text-base">Google</p>
      </button>
      <div className="flex items-center w-full mt-8">
        <hr color="#DBDBDB" className="w-full h-0.5" />
        <p className="text-base w-full">Or continue with</p>
        <hr color="#DBDBDB" className="w-full h-0.5" />
      </div>
    </div>
  );
};

export default Register;
