import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import HomeNavBar from "../Components/HomeNavBar";
import { useAuthContext } from "@asgardeo/auth-react";
import { addUserAPIUrl } from "../Utils/endpoints";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function GramasevakaDataComponent() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gnDivision, setGnDivision] = useState("");

  const { httpRequest } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    httpRequest({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      url: addUserAPIUrl,
      data: {
        id: window.sessionStorage.getItem("uid"),
        firstName: firstName,
        lastName: lastName,
        birthDate: "",
        nic: "",
        gender: "",
        address: "",
        email: "",
        mobileNumber: "",
        gnDomain: gnDivision,
      },
      attachToken: true,
    })
      .then((data) => {
        toast.success("Successfully added personal data", {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        });
        window.sessionStorage.setItem(
          "userdata",
          JSON.stringify({
            id: window.sessionStorage.getItem("uid"),
            firstName: firstName,
            lastName: lastName,
          })
        );
        navigate("/gramasevaka");
      })
      .catch((err) => {
        toast.error("Error adding personal data", {
          position: "top-center",
          theme: "dark",
          autoClose: 5000,
        });
        console.error(err);
      });
  };

  return (
    <>
      <ToastContainer />
      <Box>
        <HomeNavBar />
      </Box>
      <Box
        sx={{
          pt: [4, 0],
          pl: 4,
          pr: 4,
          pb: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          height: "75%",
          backgroundColor: "primary.main",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#fff",
          }}
        >
          Personal Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box px={["none", 50]}>
            <TextField
              label="First Name"
              variant="filled"
              fullWidth
              size="small"
              required
              color="secondary"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{
                mb: 2,
                backgroundColor: "primary.light",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />
            <TextField
              label="Last Name"
              variant="filled"
              fullWidth
              size="small"
              required
              color="secondary"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={{
                mb: 2,
                backgroundColor: "primary.light",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />
            <TextField
              variant="filled"
              fullWidth
              required
              size="small"
              label="Grama Niladhari Domain"
              color="secondary"
              sx={{
                mb: 2,
                backgroundColor: "primary.light",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
              value={gnDivision}
              onChange={(e) => setGnDivision(e.target.value)}
            />
          </Box>
          <Box px={["none", 50]}>
            <Button
              fullWidth
              variant="contained"
              color="info"
              type="submit"
              sx={{
                borderRadius: 3,
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
      <Box textAlign="center" pt={[3, 3]} pb={[0, 1]}>
        <Typography variant="body2" sx={{ fontSize: 14 }}>
          © {new Date().getFullYear()} Grama Seva. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}
