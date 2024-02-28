import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import Store from "./redux/Store.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        <App />
      </Provider>
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>
);
