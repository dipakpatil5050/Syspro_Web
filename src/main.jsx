import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.jsx";
import { LoginProvider } from "./contexts/LoginContext.jsx";
import { Toaster } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoginProvider>
        <UserProvider>
          <App />
          <Toaster />
        </UserProvider>
      </LoginProvider>
    </BrowserRouter>
  </React.StrictMode>
);
