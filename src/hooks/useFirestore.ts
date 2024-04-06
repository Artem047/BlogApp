import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../utils/firebase";
import { IPosts } from "../interface/user_storage.interface";

const useFirestore = (collectionName: string) => {
    const [docs, setDocs] = useState<IPosts[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        let unsubscribe: () => void;

        const getData = async () => {
            try {
               const q = query(collection(db, collectionName), orderBy('title', 'desc'));
            unsubscribe = onSnapshot(q, (querySnapshot) => {
                const posts: IPosts[] = [];
                querySnapshot.forEach((doc) => {
                    const imageUrl = doc.data().imageUrl;
                    const title = doc.data().title;
                    const description = doc.data().description;
                    posts.push({
                        title,
                        description,
                        imageUrl
                    });
                })
               setDocs(posts);
               setIsLoading(false)
               })
            } catch (error) {
                console.log(error);
                setIsLoading(false)
            }
        }

        getData();

        return () => {
            unsubscribe && unsubscribe();
        }
    }, [collectionName])

    return {
        docs, isLoading
  }
}

export default useFirestore