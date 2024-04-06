import { IPosts } from "../../../interface/user_storage.interface";

const CartItem = ({
  title,
  description,
  imageUrl,
  displayName,
  imageAvatar,
  createdAt,
  email,
}: IPosts) => {
  return (
    <div
      key={imageUrl}
      className="bg-white w-full rounded-xl p-5 flex flex-col gap-3 text-center max-w-[850px] mx-auto"
    >
      <div className="flex items-center gap-4">
        <img src={imageAvatar} alt="" className="w-14 h-14 rounded-full" />
        <span className="text-lg">@{displayName}</span>
          <span className="text-gray-400">
            {email} - {createdAt.toLocaleDateString()}
          </span>
      </div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p>{description}</p>
      <img src={imageUrl} alt="" className="w-[300px] mx-auto" />
    </div>
  );
};

export default CartItem;
