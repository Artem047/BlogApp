import { Navigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { ReactNode } from "react";

type TProps = {
  children: ReactNode;
};

const Protected = ({ children }: TProps) => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    return <Navigate to="/auth/login" replace />;
  }
  return children;
};

export default Protected;
