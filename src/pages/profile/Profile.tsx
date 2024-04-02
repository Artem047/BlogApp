import ImageComponent from "../../components/imageComponent/ImageComponent";
import { useAuth } from "../../context/AuthContext";
import InfoUser from "./info/InfoUser";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="ml-6 max-w-[950px] w-full">
      <img src="/profile.svg" alt="" />
      <div className="relative">
        <ImageComponent
          src={user?.photoURL || "/avatar.png"}
          className="w-28 h-28 border-4 border-white absolute bottom-[-30px] left-10"
        />
      </div>
      <InfoUser />
    </div>
  );
};

export default Profile;
