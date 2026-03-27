import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/auth-context";
import { GeographyProvider } from "./context/geography-context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <GeographyProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GeographyProvider>
  </AuthProvider>
);
