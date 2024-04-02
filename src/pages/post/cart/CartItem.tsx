import { useAuth } from "../../../context/AuthContext";
import { IUserStorage } from "../../../interface/user_storage.interface";

const CartItem = ({ id, title, description, currentUser }: IUserStorage) => {
    const { handleDeletePost } = useAuth()
  return (
    <div key={id}>
      <h1>{title}</h1>
      <p>{description}</p>
      <span>{currentUser}</span>
      <button onClick={() => handleDeletePost(id)}>Delete</button>
    </div>
  );
};

export default CartItem;
