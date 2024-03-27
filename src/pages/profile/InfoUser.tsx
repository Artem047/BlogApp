import { useEffect, useState } from "react";
import Input from "../../components/input/Input";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../utils/supabase";

const InfoUser = () => {
  const { userDisplayName } = useAuth();
  const [email, setEmail] = useState("");

  const getEmail = async () => {
    const { user } = (await supabase.auth.getUser()).data;
    setEmail(user?.user_metadata.email);
    console.log(user);
  };

  useEffect(() => {
    getEmail();
  }, []);

  return (
    <div className="bg-white p-10 flex flex-wrap gap-7">
      <div className="flex flex-col gap-2">
        <label>User Name</label>
        <Input
          type="text"
          value={userDisplayName || ""}
          className="bg-[#F7F7F7] border border-[#E1E1E1] h-12 rounded-xl outline-none text-sm px-6 w-[400px]"
          readonly
        />
      </div>
      <div className="flex flex-col gap-2">
        <label>Email</label>
        <Input
          type="text"
          value={email || ""}
          className="bg-[#F7F7F7] border border-[#E1E1E1] h-12 rounded-xl outline-none text-sm px-6 w-[400px] caret-transparent"
          readonly
        />
      </div>
    </div>
  );
};

export default InfoUser;
