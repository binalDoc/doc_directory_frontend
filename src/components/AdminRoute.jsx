import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;
  if (user.role !== "ADMIN") return <Navigate to="/home" />;

  return children;
};

export default AdminRoute;