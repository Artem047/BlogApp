import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../utils/supabase";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}
interface AuthContextType {
  handleSignOut: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleSignIn: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  email: string | null;
  fullName: string | null;
  password: string | null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [fullName, setFullName] = useState<string | null>('');
  const [email, setEmail] = useState<string>('');
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
        email: email,
        password: password,
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

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
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
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  };

  const getInfo = async () => {
    const { user } = (await supabase.auth.getUser()).data;
    setEmail(user?.user_metadata.email);
    setFullName(user?.user_metadata.fullname);
    console.log(user);
  };

  const contextValue: AuthContextType = {
    handleSignOut,
    email,
    password,
    fullName,
    handleSignUp,
    handleSignIn,
    handleChange,
  };

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION" && session?.user) {
        setFullName(session.user.user_metadata.fullname);
      } else if (event === "SIGNED_IN" && session?.user) {
        setFullName(session.user.user_metadata.fullname);
      } else {
        setFullName(null);
      }
    });

    getInfo();
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

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
