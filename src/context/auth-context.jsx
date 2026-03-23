import React, { createContext, useContext, useState } from "react";
import {
  deleteAllLocalData,
  getUserDetails,
  saveUserDetails
} from "../utils/helper";

let globalLogout = () => {};

// Create the context
export const AuthContext = createContext();

// Create a context provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserDetails() || null);

  const login = async (userData) => {
    setUser(userData);
    saveUserDetails(userData);
  };

  const logout = () => {
    setUser(null);
    deleteAllLocalData();
  };

  globalLogout = logout;

  const isUserLoggedIn = () => getUserDetails() || null;

  const contextValues = {
    user,
    login,
    logout,
    isUserLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for using the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export const logoutUser = () => {
  if (typeof globalLogout === "function") {
    globalLogout();
  }
};
