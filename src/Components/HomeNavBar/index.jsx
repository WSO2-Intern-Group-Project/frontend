import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "../../assets/logo.png";

export default function HomeNavBar() {
  
  return (
    <AppBar
      color="primary"
      position="static"
      sx={{
        paddingLeft: 2,
        paddingRight: 2,
        
      }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ width: 25 }} mr={1}>
            <img src={logo} alt="logo" style={{ width: "100%" }} />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: [60, 20],
            }}>
            Grama Seva
          </Typography>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}>
            Grama Seva
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
