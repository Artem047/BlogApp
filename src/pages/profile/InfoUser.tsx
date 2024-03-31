import { useAuth } from "../../context/AuthContext";

const InfoUser = () => {
  const {fullName, email, user } = useAuth();

  return (
    <div className="bg-white p-10 flex flex-wrap gap-7">
      <div className="flex flex-col gap-2">
        <label>Display Name</label>
        <p className="bg-[#F7F7F7] flex items-center border border-[#E1E1E1] h-12 rounded-xl outline-none text-sm px-6 w-[400px]">{`@${user?.user_metadata.user_name || fullName}`}</p>
      </div>
      <div className="flex flex-col gap-2">
        <label>Email</label>
        <p className="bg-[#F7F7F7] flex items-center border border-[#E1E1E1] h-12 rounded-xl outline-none text-sm px-6 w-[400px]">{email || user?.user_metadata.email}</p>
      </div>
      <div className="flex flex-col gap-2">
        <label>Name</label>
        <p className="bg-[#F7F7F7] flex items-center border border-[#E1E1E1] h-12 rounded-xl outline-none text-sm px-6 w-[400px]">{user?.user_metadata.name === undefined ? 'Anonymous' : user?.user_metadata.name}</p>
      </div>
      <div className="flex flex-col gap-2">
        <label>Created At</label>
        <p className="bg-[#F7F7F7] flex items-center border border-[#E1E1E1] h-12 rounded-xl outline-none text-sm px-6 w-[400px]">{user?.created_at.substring(0, 10)}</p>
      </div>
    </div>
  );
};

export default InfoUser;
