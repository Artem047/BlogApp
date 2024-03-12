import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../utils/firebase";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextType {
  signInpWithEmailAndPassword: (email: string, password: string) => void;
  signUpWithEmailAndPassword: (email: string, password: string) => void;
  logOut: () => void;
  user: User | null;
}

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signInpWithEmailAndPassword = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUser = userCredential.user;
        setUser(newUser);
        console.log(newUser);
      })
      .catch((error) => console.error(error.message));
  };

  const signUpWithEmailAndPassword = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUser = userCredential.user;
        setUser(newUser);
        console.log(newUser);
      })
      .catch((error) => console.error(error.message));
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => console.error(error.message));
  };

  const contextValue: AuthContextType = {
    signInpWithEmailAndPassword,
    signUpWithEmailAndPassword,
    logOut,
    user,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User", currentUser);
    });

    return () => {
      unsubscribe();
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
