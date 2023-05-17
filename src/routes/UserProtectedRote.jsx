import React from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { Navigate } from "react-router-dom";

export const UserProtectedRoute = ({ children }) => {
  const { state, getAccessToken } = useAuthContext();
  const authed = state.isAuthenticated;

  if (authed) {
    if (window.sessionStorage.getItem("usertype") === "user") {
      return children;
    } else {
      return <Navigate to={"/user"} />;
    }
  }
  return <Navigate to={"/signin"} />;
};
