import { useAuth } from "../../context/AuthContext";
import InfoUserItem from "./InfoUserItem";

const InfoUser = () => {
  const { email, user } = useAuth();

  return (
    <div className="bg-white p-10">
      <form className="flex flex-wrap gap-7">
        <InfoUserItem
          title="Display Name"
          text={`@${user?.displayName || "Anonymous"}`}
        />
        <InfoUserItem title="Email" text={`${email || user?.email}`} />
        <InfoUserItem
          title="Name"
          text={`${user?.displayName || "Anonymous"}`}
        />
        <InfoUserItem
          title="Created Date"
          text={`${user?.metadata.creationTime?.substring(0, 16)}`}
        />
      </form>
    </div>
  );
};

export default InfoUser;
