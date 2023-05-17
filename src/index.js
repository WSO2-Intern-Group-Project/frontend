import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { AuthProvider } from "@asgardeo/auth-react";

const config = {
  signInRedirectURL: "http://localhost:3000/roleselect",
  signOutRedirectURL: "http://localhost:3000",
  clientID: "cUdKTvv88ZNnrd82SJE3reJDSfka",
  baseUrl: "https://api.asgardeo.io/t/internprojectgroup5",
  scope: ["openid", "profile", "groups"],
  storage: "sessionStorage",
  resourceServerURLs: [
    "https://a7bf0dba-d37a-4f74-ab2a-11d52f500ed9-prod.e1-us-east-azure.choreoapis.dev/bhzm/gramasevabackend/endpoint-9090-803/1.0.0",
    "https://a7bf0dba-d37a-4f74-ab2a-11d52f500ed9-dev.e1-us-east-azure.choreoapis.dev/bhzm/externalapis/endpoint-9090-803/1.0.0",
  ],
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider config={config}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </AuthProvider>
);
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
