import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return !user ? <div className="flex justify-center items-center min-h-screen p-4">{children}</div> : <Navigate to="/home" />;
};

export default PublicRoute;