import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

const StyledBox = styled(Box)({
    zIndex: -100,
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  padding: "1rem",
  textAlign: "center",
  py: 3,
});

const Footer = () => {
  return (
    <StyledBox sx={{ alignContent: "flex-end" }}>
      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} Grama App. All rights reserved.
      </Typography>
    </StyledBox>
  );
};

export default Footer;
