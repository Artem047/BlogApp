import { useAuth } from "../../context/AuthContext";

import { useState } from "react";
import useStorage from "../../hooks/useStorage";

const CreatePost = () => {
  const { handleChangePost } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { startUpload, progress } = useStorage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFile) {
      startUpload(selectedFile);
      console.log(selectedFile);
    }
    setSelectedFile(null);
  };

  return (
    <div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
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
        <input type="file" onChange={handleFileChange} />
        <button
          type="submit"
          className={`${Boolean(progress) && "loading"}`}
          disabled={!selectedFile}
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
