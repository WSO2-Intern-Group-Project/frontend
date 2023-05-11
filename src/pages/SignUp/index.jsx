import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import SignUpImage from "../../assets/images/signup-image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import "./index.css";

export default function SignUp() {
  const isMobileScreen = useMediaQuery("(max-width: 767px)");

  return (
    <Box
      pt={[10, 30]}
      sx={{
        backgroundColor: "#344966",
        height: "100vh",
        textAlign: "center",
        justifyContent: "center",
      }}>
      <Box px={[5, 200]}>
        <Box mx="auto" width={[200, 700]}>
          <img src={SignUpImage} alt="SignIn" style={{ width: "100%" }} />
        </Box>
        <Box mb={[5, 20]} />
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 900, color: "#b4cded", fontSize: [30, 100] }}>
          Grama App
        </Typography>
        <Box mb={[5, 10]} />
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 700, color: "#ffffff", fontSize: [24, 72] }}>
          Sign Up
        </Typography>
        <Box mb={[5, 10]} />
        <Box>
          <Button
            fullWidth
            variant="contained"
            startIcon={
              <FontAwesomeIcon
                icon={faFacebookF}
                className="login-icon"
                style={{ fontSize: "1.2em" }}
              />
            }
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
              "@media (min-width: 1024px)": {
                fontSize: "2.5rem",
                padding: "16px 32px",
              },
            }}>
            Sign in with facebook
          </Button>
          <Box mb={[2, 5]} />
          <Button
            fullWidth
            color="error"
            variant="contained"
            startIcon={
              <FontAwesomeIcon
                icon={faGoogle}
                className="login-icon"
                style={{ fontSize: "1.2em" }}
              />
            }
            sx={{
              borderRadius: 50,
              textAlign: "left",
              "& .MuiButton-startIcon": {
                margin: 0,
              },
              "@media (min-width: 1024px)": {
                fontSize: "2.5rem",
                padding: "16px 32px",
              },
            }}>
            Sign in with Google &nbsp;&nbsp;&nbsp;
          </Button>
          <Box mb={[2, 5]} />
          <Button
            fullWidth
            variant="contained"
            startIcon={
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="login-icon"
                style={{ fontSize: "1.2em" }}
              />
            }
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
              "@media (min-width: 1024px)": {
                fontSize: "2.5rem",
                padding: "16px 32px",
              },
            }}>
            Sign in with linkedin &nbsp;&nbsp;
          </Button>
        </Box>
      </Box>
      {!isMobileScreen && (
        <Box
          mt={10}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}>
          <Typography variant="body1" sx={{ color: "#eeeeee", fontSize: 40, marginRight: 2 }}>
            Already registered?
          </Typography>
          <Button sx={{ textTransform: "none", color: "#7aa9e9" }}>
            <Typography variant="body1" sx={{ fontSize: 40, textDecoration: "underline" }}>
              Sign In Now
            </Typography>
          </Button>
        </Box>
      )}
      {isMobileScreen && (
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
            Already registered?
          </Typography>
          <Button sx={{ textTransform: "none", color: "#7aa9e9" }}>
            <Typography variant="body1" sx={{ textDecoration: "underline" }}>
              Sign In Now
            </Typography>
          </Button>
        </Box>
      )}
    </Box>
  );
}
