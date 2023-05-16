import React from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { Navigate } from "react-router-dom";

export const GramasewakaProtectedRoute = ({ children }) => {
  const { state, getAccessToken } = useAuthContext();
  const authed = state.isAuthenticated;

  if (authed) {
    if (!getAccessToken().groups) {
      return children;
    } else {
      return <Navigate to={"/gramasevaka"} />;
    }
  }
  return <Navigate to={"/signin"} />;
};
