import useFirestore from "../../hooks/useFirestore";
import CartItem from "../post/cart/CartItem";
import CreatePost from "../post/CreatePost";

const Home = () => {
  const { docs: posts, isLoading } = useFirestore("posts");
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="max-w-[650px] w-full mx-auto">
      <div>
        <CreatePost />
      </div>
      <div className="flex gap-3 flex-col">
        {posts.map((post, id) => {
          return (
              <CartItem key={id}  {...post} />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
