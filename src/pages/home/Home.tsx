import useFirestore from "../../hooks/useFirestore";
import CartItem from "../post/cart/CartItem";

const Home = () => {
  const { docs: posts, isLoading } = useFirestore("posts");
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
     {posts.map((image) => {
        return (
          <CartItem {...image} />
        );
      })}
    </div>
  );
};

export default Home;
