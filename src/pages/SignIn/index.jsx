import React from "react";
import { Box, Typography, Button } from "@mui/material";
import SignInImage from "../../assets/images/signin-image.png";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import "../../App.css";

export default function SignIn() {
  return (
    <Box
      pt={10}
      sx={{
        backgroundColor: "#344966",
        height: "100vh",
        textAlign: "center",
        justifyContent: "center",
      }}>
      <Box px={5}>
        <img src={SignInImage} alt="SignIn" style={{ width: 200 }} />
        <Box mb={5} />
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 900, color: "#b4cded", fontSize: 30 }}>
          Grama App
        </Typography>
        <Box mb={5} />
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 700, color: "#ffffff", fontSize: 24 }}>
          Sign In
        </Typography>
        <Box mb={5} />
        <Box>
          <Button
            fullWidth
            variant="contained"
            startIcon={<FacebookOutlinedIcon sx={{ marginLeft: -5 }} />}
            sx={{
              borderRadius: 50,
              backgroundColor: "#2651BE",
              "&:hover": {
                backgroundColor: "#0069d9",
                borderColor: "#0062cc",
                boxShadow: "none",
              },
              "&:active": {
                boxShadow: "none",
                backgroundColor: "#0062cc",
                borderColor: "#005cbf",
              },
              "&:focus": {
                boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
              },
              textAlign: "left",
              "& .MuiButton-startIcon": {
                margin: 0,
              },
            }}>
            Sign in with facebook
          </Button>
          <Box mb={2} />
          <Button
            fullWidth
            color="error"
            variant="contained"
            startIcon={<GoogleIcon sx={{ marginLeft: -6 }} />}
            sx={{
              borderRadius: 50,
              textAlign: "left",
              "& .MuiButton-startIcon": {
                margin: 0,
              },
            }}>
            Sign in with Google
          </Button>
          <Box mb={2} />
          <Button
            fullWidth
            variant="contained"
            startIcon={<GoogleIcon sx={{ marginLeft: -6 }} />}
            sx={{
              borderRadius: 50,
              backgroundColor: "#1B6AB2",
              "&:hover": {
                backgroundColor: "#0069d9",
                borderColor: "#0062cc",
                boxShadow: "none",
              },
              "&:active": {
                boxShadow: "none",
                backgroundColor: "#0062cc",
                borderColor: "#005cbf",
              },
              "&:focus": {
                boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
              },
              textAlign: "left",
              "& .MuiButton-startIcon": {
                margin: 0,
              },
            }}>
            Sign in with linkedin
          </Button>
        </Box>
      </Box>
      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0D1821",
          width: "100%",
          height: 80,
          borderRadius: "50px 50px 0 0",
        }}>
        <Typography variant="body1" sx={{ color: "#ffffff" }}>
          No Account yet?
        </Typography>
        <Button sx={{ textTransform: "none" }}>Sign Up Now</Button>
      </Box>
    </Box>
  );
}
