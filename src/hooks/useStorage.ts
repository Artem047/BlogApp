import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { db, storage } from "../utils/firebase";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const useStorage = () => {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<Error | null>(null);
  const { title, description } = useAuth();


  const startUpload = (file: File) => {
    if (!file) {
      return;
    }
    const fileId = v4();
    const formatFile = file.type.split("/")[1];
    const storageRef = ref(storage, `posts/${fileId}.${formatFile}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        setError(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setProgress(progress);

        await addDoc(collection(db, 'posts'), {
            imageUrl: downloadURL,
            title: title,
            description: description,
          })
      });
  };

  return {
    progress,
    error,
    startUpload,
  };
};

export default useStorage;
