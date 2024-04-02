import { useAuth } from "../../context/AuthContext";
import CartItem from "../post/cart/CartItem";

const Home = () => {
  const { posts } = useAuth();
  return (
    <div>
      {posts.map((post) => {
        return (
          <CartItem
            title={post.title}
            description={post.description}
            id={post.id}
            currentUser={post.currentUser}
          />
        );
      })}
    </div>
  );
};

export default Home;
