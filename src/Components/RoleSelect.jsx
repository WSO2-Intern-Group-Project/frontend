import React, { useEffect, useState } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import { Navigate, useNavigate } from "react-router-dom";
import { backendBaseURL } from "../Utils/endpoints";
import LoadingScreen from "../Utils/LoadingScreen";

export default function RoleSelect() {
  const navigate = useNavigate();
  const { state, getDecodedIDToken } = useAuthContext();
  const { httpRequest } = useAuthContext();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [tokenLoading, setTokenLoading] = useState(true);
  const [type, setType] = useState("");

  useEffect(() => {}, [state]);

  if (state.isLoading) {
    return <LoadingScreen />;
  } else {
    if (loading) {
      getDecodedIDToken().then((token) => {
        const uid = token.sub;
        window.sessionStorage.setItem("uid", uid);
        httpRequest({
          headers: {
            Accept: "application/json",
          },
          method: "GET",
          url: backendBaseURL + "/userById?id=" + uid,
          attachToken: true,
        })
          .then((data) => {
            console.log(data);
            setData(data.data);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  }
  if (loading) {
    return <LoadingScreen />;
  } else {
    if (data.user) {
      window.sessionStorage.setItem("userdata", JSON.stringify(data.userdata));
      getDecodedIDToken().then((token) => {
        if (!token.groups) {
          window.sessionStorage.setItem("usertype", "user");
          window.sessionStorage.setItem("actoken", JSON.stringify(token));
          setType("user");
          setTokenLoading(false);
        } else if (token.groups) {
          window.sessionStorage.setItem("usertype", "gramasevaka");
          window.sessionStorage.setItem("actoken", JSON.stringify(token));
          setType("gramasevaka");
          setTokenLoading(false);
        }
      });
    } else {
      getDecodedIDToken().then((token) => {
        console.log(token);
        if (!token.groups) {
          window.sessionStorage.setItem("usertype", "user");
          window.sessionStorage.setItem("actoken", JSON.stringify(token));
          setType("user");
          navigate("/personalData");
        } else if (token.groups) {
          window.sessionStorage.setItem("usertype", "gramasevaka");
          window.sessionStorage.setItem("actoken", JSON.stringify(token));
          setType("gramasevaka");
          navigate("/gramasevakaData");
        }
      });
    }
  }
  if (tokenLoading) {
    return <LoadingScreen />;
  } else {
    if (type === "user") {
      return <Navigate to={"/user"} />;
    } else if (type === "gramasevaka") {
      return <Navigate to={"/gramasevaka"} />;
    }
    return <Navigate to={"/signin"} />;
  }
}
