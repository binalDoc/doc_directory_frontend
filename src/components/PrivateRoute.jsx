import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import Navbar from "./Navbar";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <> <Navbar />
    <div className="mt-16 px-4">
      {children}
    </div> </>
    :
    <Navigate to="/" />;
};

export default PrivateRoute;