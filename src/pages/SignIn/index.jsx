import React, { useEffect } from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import Logo from "../../assets/logo.png";
import { useAuthContext } from "@asgardeo/auth-react";
import LoginIcon from "@mui/icons-material/Login";
import SignInImage from "../../assets/images/signin-image.png";
import "./index.css";

export default function SignIn() {
  const isMobileScreen = useMediaQuery("(max-width: 767px)");
  const { signIn } = useAuthContext();

  useEffect(() => {
    window.sessionStorage.removeItem("userdata");
    window.sessionStorage.removeItem("uid");
    window.sessionStorage.removeItem("actoken");
    window.sessionStorage.removeItem("usertype");
  }, []);

  return (
    <Box
      pt={[5, 5]}
      sx={{
        backgroundColor: "background.paper",
        height: "100vh",
        textAlign: "center",
        justifyContent: "center",
      }}>
      <Box px={[3, 50]}>
        <Box mx="auto" sx={{ width: ["90%", "50%"] }}>
          <img src={SignInImage} alt="SignIn" style={{ width: "100%" }} />
        </Box>
        <Box mb={8} />
        <Box
          sx={{
            height: [200, 280],
          }}
          px={[3, 5]}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box mx={["auto", 2]} sx={{ width: ["10%", "6%"] }} mb={2}>
              <img src={Logo} alt="logo" style={{ width: "100%" }} />
            </Box>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontSize: 30,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "text.primary",
                textDecoration: "none",
              }}>
              Grama Seva
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: ".05rem",
                color: "text.primary",
              }}>
              Efficient letter requests and seamless communication for Citizens and Grama Sevakas.
              Connect with ease!
            </Typography>
          </Box>

          <Box mb={[5, 6]} />
          <Box>
            <Button
              onClick={() => signIn()}
              fullWidth
              variant="contained"
              startIcon={<LoginIcon sx={{ pr: 1 }} />}
              sx={{
                height: 50,
                width: "60%",
                borderRadius: 50,
                backgroundColor: "success.dark",
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
                  fontSize: "0.9rem",
                  padding: "8px 20px",
                },
              }}>
              Sign in
            </Button>
          </Box>
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
          backgroundColor: "primary.dark",
          width: "100%",
          height: 80,
          borderRadius: "20px 20px 0 0",
        }}>
        <Typography variant="body1" sx={{ color: "#ffffff", fontSize: ["none", 12] }}>
          © {new Date().getFullYear()} Grama Seva. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
