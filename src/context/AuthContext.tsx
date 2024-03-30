import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../utils/supabase";
import { User } from "@supabase/supabase-js";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}
interface AuthContextType {
  handleSignOut: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleSignIn: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  signInWithGithub: () => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  email: string | null;
  fullName: string | null;
  password: string | null;
  user: User | null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState<string | null>('');
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('');
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "fullname":
        setFullName(value);
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

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signUp({
        email: email!,
        password: password!,
        options: {
          data: {
            fullname: fullName,
          },
        },
      });
      if (error) throw error;
      alert("Check your email for verification link");
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email!,
        password: password!,
      });
      if (error) throw error;
    } catch (error) {
      alert(error);
    }
  };

  const handleSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signOut();
      setUser(null);
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGithub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
      })
      if (error) throw error;
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        getUser(session?.user);
        console.log(session?.user)
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => {
      data?.subscription.unsubscribe();
    };
  }, []);

  const getUser = async (user: User | null | undefined) => {
    if (user) {
      setUser(user);
      setEmail(user.user_metadata.email);
      setFullName(user.user_metadata.fullname);
    } else {
      setUser(null);
      setEmail(null);
      setFullName(null);
    }
  };

  const contextValue: AuthContextType = {
    handleSignOut,
    email,
    password,
    fullName,
    user,
    handleSignUp,
    handleSignIn,
    handleChange,
    signInWithGithub
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
