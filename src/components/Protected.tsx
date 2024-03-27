import { ReactNode } from "react"
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface IProtected {
    children: ReactNode;
}
const Protected = ({ children }: IProtected) => {
  const {fullName} = useAuth()

  if(!fullName){
    return <Navigate to={'/auth/register'} replace />
  }
  return children;
}

export default Protected