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
  User,
} from "firebase/auth";
import {
  auth,
  GitHubProvider,
  GoogleProvider,
} from "../utils/firebase";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}
interface AuthContextType {
  email: string | null;
  displayName: string | null;
  password: string | null;
  user: User | null;
  title: string;
  description: string;
  handleNewSignUp: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleNewSignIn: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleNewChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNewSignOut: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  handleChangePost: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string | null>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
      await createUserWithEmailAndPassword(auth, email, password).then(
        (data) => {
          setUser(data.user);
          console.log(data);
        }
      );
    } catch (e) {
      alert(e);
    }
  };

  const handleNewSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password).then((data) => {
        setUser(data.user);
        console.log(data);
      });
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
      await signInWithPopup(auth, GitHubProvider).then((data) => {
        setUser(data.user);
        console.log(data);
      });
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
    handleNewChange,
    handleNewSignUp,
    handleNewSignIn,
    handleNewSignOut,
    signInWithGithub,
    signInWithGoogle,
    handleChangePost,
    title,
    description,
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
