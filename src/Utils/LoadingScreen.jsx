import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        hight: "100%",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress 
            color="secondary"
        />
      </Box>
    </Box>
  );
};

export default LoadingScreen;
