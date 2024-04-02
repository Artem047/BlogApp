import { useAuth } from "../../context/AuthContext";

const Collection = () => {
  const { handleChangePost, handleNewPost} = useAuth()

  return (
    <div>
      <div>
        <input name="title" placeholder="Title..." onChange={handleChangePost}  />
        <input name="description" placeholder="Description..."  onChange={handleChangePost} />
        <button onClick={handleNewPost}>create</button>
      </div>
    </div>
  );
};

export default Collection;
