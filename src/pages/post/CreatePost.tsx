import { useAuth } from "../../context/AuthContext";

const CreatePost = () => {
  const { handleChangePost, handleNewPost } = useAuth();

  return (
    <div>
      <div className="flex flex-col gap-3">
        <input
          name="title"
          placeholder="Title..."
          onChange={handleChangePost}
        />
        <input
          name="description"
          placeholder="Description..."
          onChange={handleChangePost}
        />
        <button onClick={handleNewPost}>create post</button>
      </div>
    </div>
  );
};

export default CreatePost;
