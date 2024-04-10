import { useAuth } from "../../context/AuthContext";
import { useState, useRef } from "react";
import useStorage from "../../hooks/useStorage";
import { IoImageOutline } from "react-icons/io5";
import { MdGif } from "react-icons/md";

const CreatePost = () => {
  const { handleChangePost } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { startUpload, progress } = useStorage();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFile) {
      startUpload(selectedFile);
      console.log(selectedFile);
    }
    setSelectedFile(null);
    setImagePreview(null);
  };

  return (
    <form
      className="flex flex-col gap-3 bg-white border-b my-3 p-5"
      onSubmit={handleSubmit}
    >
      <input
        className="outline-none placeholder:text-[#2B4247] placeholder:text-lg"
        name="title"
        type="text"
        placeholder="Title..."
        onChange={handleChangePost}
      />
      {imagePreview && (
        <img src={imagePreview} alt="Preview" className="w-[300px] mx-auto" />
      )}
      <div className="mt-16 flex justify-between">
        <div className="flex gap-3 items-center">
          <IoImageOutline
            size={25}
            className="cursor-pointer "
            onClick={handleClick}
          />
          <MdGif size={35} className="cursor-pointer " onClick={handleClick} />
        </div>

        <button
          type="submit"
          className={`bg-[#00BD97] text-white px-8 py-3 rounded-md text-lg ${
            Boolean(progress) && "loading"
          }`}
          disabled={!selectedFile}
        >
          Publisg Post
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </form>
  );
};

export default CreatePost;
