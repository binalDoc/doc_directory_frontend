import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { useAuth } from "./context/auth-context";
import "react-toastify/dist/ReactToastify.css";

import { getAuthToken } from "./utils/helper.js";
import { jwtDecode } from "jwt-decode";

import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Welcome from "./pages/Welcome.jsx";
import Profile from "./pages/Profile.jsx";
import AdminRoute from "./components/AdminRoute";
import Dashboard from "./pages/Dashboard";
import DoctorsList from "./pages/DoctorsList.jsx";
import Users from "./pages/Users.jsx";
import ProfileViews from "./pages/ProfileViews.jsx";
import SearchAnalytics from "./pages/SearchAnalytics.jsx";

function App() {
  const { user, logout } = useAuth();

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      try {
        const decoded = jwtDecode(token);

        // JWT exp is in seconds, JS uses ms
        if (decoded.exp * 1000 < Date.now()) {
          console.warn("Token expired — logging out");
          logout();
        }
      } catch (err) {
        console.error("Invalid JWT — logging out", err);
        logout(); // if invalid token
      }
    } else {
      logout();
    }
  }, []);

  return <>
    <ToastContainer
    />

    <div className="min-h-screen bg-gray-100">
      {/* <Sidebar /> */}
      <Routes>

        {/* Public */}
        <Route path="/" element={<Welcome />} />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/*ADMIN ROUTES*/}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/doctors"
          element={
            <AdminRoute>
              <DoctorsList />
            </AdminRoute>
          }
        />
         <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/profile-views"
          element={
            <AdminRoute>
              <ProfileViews />
            </AdminRoute>
          }
        />
         <Route
          path="/admin/search-analytics"
          element={
            <AdminRoute>
              <SearchAnalytics />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  </>

}

export default App;
