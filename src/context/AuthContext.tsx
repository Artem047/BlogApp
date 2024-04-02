import React, {
  FormEvent,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { auth, collectionUsersRef, db, GitHubProvider, GoogleProvider } from "../utils/firebase";
import { addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}
interface IUserStorage {
  id: string;
  title?: string;
  description?: number;
  currentUser?: string;
}
interface AuthContextType {
  email: string | null;
  displayName: string | null;
  password: string | null;
  user: User | null;
  posts: IUserStorage[];
  handleNewSignUp: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleNewSignIn: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleNewChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNewSignOut: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  handleUpdateProfile: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleNewPost: () => Promise<void>;
  handleDeletePost: (id: string) => Promise<void>;
  handleChangePost: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string | null>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState<IUserStorage[]>([]);

  const handleChangePost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const handleNewPost = async () => {
    const currentUser = user ? user.displayName : 'Anonymous';
    const newUser = {
      title,
      description, 
      currentUser
    }
     await addDoc(collectionUsersRef, newUser);
  }

  const handleDeletePost = async (id: string) => {
    const userDoc = doc(db, "posts", id);
    await deleteDoc(userDoc);
  }

  const handleNewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "displayName":
        setDisplayName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleNewSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password).then((data) => {
        setUser(data.user);
        console.log(data);
      })
    } catch (e) {
      alert(e);
    }
  };

  const handleNewSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password).then((data) =>{
        setUser(data.user);
        console.log(data)
      }
      );
    } catch (e) {
      alert(e);
    }
  };

  const handleNewSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (e) {
      alert(e);
    }
  };

  const signInWithGithub = async () => {
    try {
      await signInWithPopup(auth, GitHubProvider).then((data) =>{
        setUser(data.user)
        console.log(data)
      }
      );
    } catch (e) {
      console.error(e);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, GoogleProvider).then((data) => {
        setUser(data.user);
        console.log(data);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const currentUser = auth.currentUser;
      if (currentUser !== null) {
        await updateProfile(currentUser, {
          displayName: displayName,
        });
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collectionUsersRef);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User", currentUser);
    });
    return unsubscribe;
  }, []);

  const contextValue: AuthContextType = {
    email,
    password,
    displayName,
    user,
    posts,
    handleNewChange,
    handleNewSignUp,
    handleNewSignIn,
    handleNewSignOut,
    signInWithGithub,
    handleUpdateProfile,
    signInWithGoogle,
    handleDeletePost,
    handleNewPost,
    handleChangePost
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
