import useFirestore from "../hooks/useFirestore";

const ImageGallery = () => {
  const { docs: images, isLoading } = useFirestore("images");
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      {images.map((image) => {
        return (
          <div key={image.imageUrl} className="bg-gray-300 p-3 rounded-xl max-w-[450px] w-full">
            <figure>
              <img src={image.imageUrl} alt="" />
            </figure>
            <div>
              <p>Upload by: {image.userEmail}</p>
              <span>Created At: {image.createdAt.toLocaleDateString()}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageGallery;
