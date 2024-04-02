import React, {
  FormEvent,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
// import { supabase } from "../utils/supabase";
// import { User } from "@supabase/supabase-js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { auth, GitHubProvider, GoogleProvider } from "../utils/firebase";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}
interface AuthContextType {
  // handleSignOut: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  // handleSignUp: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  // handleSignIn: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  // signInWithGithub: () => Promise<void>;
  // handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  email: string | null;
  displayName: string | null;
  password: string | null;
  user: User | null;
  handleNewSignUp: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleNewSignIn: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleNewChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNewSignOut: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  handleUpdateProfile: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string | null>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      alert(e);
    }
  };

  const handleNewSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password).then((data) =>
        console.log(data)
      );
    } catch (e) {
      alert(e);
    }
  };

  const handleNewSignOut = async () => {
    try {
      await signOut(auth);
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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User", currentUser);
    });
    return unsubscribe();
  }, []);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   switch (name) {
  //     case "fullname":
  //       setFullName(value);
  //       break;
  //     case "email":
  //       setEmail(value);
  //       break;
  //     case "password":
  //       setPassword(value);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const { error } = await supabase.auth.signUp({
  //       email: email!,
  //       password: password!,
  //       options: {
  //         data: {
  //           fullname: fullName,
  //         },
  //       },
  //     });
  //     if (error) throw error;
  //     alert("Check your email for verification link");
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const { error } = await supabase.auth.signInWithPassword({
  //       email: email!,
  //       password: password!,
  //     });
  //     if (error) throw error;
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  // const handleSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const { error } = await supabase.auth.signOut();
  //     setUser(null);
  //     if (error) throw error;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const signInWithGithub = async () => {
  //   try {
  //     const { error } = await supabase.auth.signInWithOAuth({
  //       provider: "github",
  //     });
  //     if (error) throw error;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   const { data } = supabase.auth.onAuthStateChange((event, session) => {
  //     if (event === "SIGNED_IN") {
  //       getUser(session?.user);
  //       console.log(session?.user);
  //     } else if (event === "SIGNED_OUT") {
  //       setUser(null);
  //     }
  //   });

  //   return () => {
  //     data?.subscription.unsubscribe();
  //   };
  // }, []);

  // const getUser = async (user: User | null | undefined) => {
  //   if (user) {
  //     setUser(user);
  //     setEmail(user.user_metadata.email);
  //     setFullName(user.user_metadata.fullname);
  //   } else {
  //     setUser(null);
  //     setEmail(null);
  //     setFullName(null);
  //   }
  // };

  const contextValue: AuthContextType = {
    // handleSignOut,
    email,
    password,
    displayName,
    // fullName,
    user,
    // handleSignUp,
    // handleSignIn,
    // handleChange,
    // signInWithGithub,
    handleNewChange,
    handleNewSignUp,
    handleNewSignIn,
    handleNewSignOut,
    signInWithGithub,
    handleUpdateProfile,
    signInWithGoogle,
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
