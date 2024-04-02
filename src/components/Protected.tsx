import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import { ReactNode } from "react";

interface IProps{
    children: ReactNode;
}

const Protected = ({ children }: IProps) => {
    const { user } = useAuth();

    if(!user) {
        return <Navigate to={'/auth/register'} />
    }
  return children;
}

export default Protected