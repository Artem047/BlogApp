import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, provider } from "../utils/firebase";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { supabase } from "../utils/supabase";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextType {
  signInpWithEmailAndPassword: (email: string, password: string) => void;
  signUpWithEmailAndPassword: (email: string, password: string) => void;
  googleSignIn: () => void;
  logOut: () => void;
  user: User | null;
}

interface AuthProviderProps {
  children: ReactNode;
}
interface AuthContextType {
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleSignIn: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleSignOut: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data ,error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            fullname: formData.fullname,
          },
        },
      });
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data ,error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;
      console.log(data);
    } catch (error) {
      alert(error);
    }
  };

  const handleSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  }

  const contextValue: AuthContextType = { handleSignUp, handleChange, handleSignIn, handleSignOut };

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
