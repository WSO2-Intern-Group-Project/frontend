import React, { useEffect, useState } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { Navigate } from "react-router-dom";

export default function RoleSelect() {
  const { state, getAccessToken } = useAuthContext();

  useEffect(() => {}, [state]);
  if (state.isLoading) {
    return <div>Loading...</div>;
  } else {
    if (!getAccessToken().groups) {
      return <Navigate to={"/user"} />;
    } else if (getAccessToken().groups) {
      return <Navigate to={"/gramasevaka"} />;
    }
    return <Navigate to={"/signin"} />;
  }
}
