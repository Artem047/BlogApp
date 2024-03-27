import ImageComponent from "../components/imageComponent/ImageComponent";
import InfoUser from "./profile/InfoUser";


const Profile = () => {

  return (
    <div className=" ml-6">
      <img src="/profile.svg" alt="" />
      <div className="relative">
      <ImageComponent src="/avatar.png" className="w-28 h-28 border-4 border-white absolute bottom-[-30px] left-10" />
      </div>
      <InfoUser />
    </div>
  );
};

export default Profile;
