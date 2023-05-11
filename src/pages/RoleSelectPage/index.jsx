import React from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import RoleImage from "../../assets/images/role-image.png";

export default function RoleSelectPage() {
  const isMobileScreen = useMediaQuery("(max-width: 767px)");

  return (
    <Box
      sx={{
        backgroundColor: "#f0f4ef",
        height: "100vh",
        textAlign: "center",
        justifyContent: "center",
      }}>
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: "#0D1821",
          height: [450, 1100],
          borderRadius: ["0 0 50px 50px", "0 0 0 0"],
        }}>
        <Box width={[200, 600]} mx="auto" pt={[15, 30]}>
          <img src={RoleImage} alt="SignIn" style={{ width: "100%" }} />
        </Box>
      </Box>
      <Box px={[5, 200]} pt={10} height={[290, 900]}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, fontSize: [20, 72] }}>
          Select your role
        </Typography>
        <Box mb={[5, 10]} />
        <Button
          fullWidth
          variant="contained"
          sx={{
            borderRadius: 50,
            backgroundColor: "#0d1821",
            "&:hover": {
              backgroundColor: "#0d1821",
              borderColor: "#252f37",
              boxShadow: "none",
            },
            "&:active": {
              boxShadow: "none",
              backgroundColor: "#252f37",
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
          Grama Niladhari
        </Button>
        <Box mb={[3, 5]} />
        <Button
          fullWidth
          variant="contained"
          sx={{
            borderRadius: 50,
            backgroundColor: "#0d1821",
            "&:hover": {
              backgroundColor: "#0d1821",
              borderColor: "#252f37",
              boxShadow: "none",
            },
            "&:active": {
              boxShadow: "none",
              backgroundColor: "#252f37",
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
          General User
        </Button>
      </Box>
      <Box>
        <Typography variant="body1" sx={{ color: "#252f37", fontSize: [15, 40] }}>
          Grama App: © All rights reserved {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
}
