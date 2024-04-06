import { IPosts } from "../../../interface/user_storage.interface";

const CartItem = ({ title, description, imageUrl }: IPosts) => {
  return (
    <div key={imageUrl} className="bg-gray-300 max-w-[450px] w-full rounded-xl p-3">
      <img src={imageUrl} alt="" />
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default CartItem;
