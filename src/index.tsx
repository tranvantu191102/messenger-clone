import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Layout from "./components/Layout";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Layout />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
