import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import Navbar from "./Navbar";

const PublicRoute = ({ children }) => {
  // return <div className="flex justify-center items-center min-h-screen p-4">{children}</div> : <Navigate to="/home" />;

  return <> <Navbar />
    <div className="mt-16 px-4">
      {children}
    </div> </>
};

export default PublicRoute;