import { useAuth } from "../../context/AuthContext";
import CartItem from "../post/cart/CartItem";

const Home = () => {
  const { posts } = useAuth();
  return (
    <div>
      {posts.map((post) => {
        return (
          <CartItem
            key={post.id}
            title={post.title}
            description={post.description}
            id={post.id}
            currentUser={post.currentUser}
            currentUserAvatar={post.currentUserAvatar}
          />
        );
      })}
    </div>
  );
};

export default Home;
