import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import { ListItemIcon } from "@mui/material";
import logo from "../../assets/logo.png";
import { Outlet } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";
import Footer from "../PublicUserComponents/Footer";

function GSDrawer() {
  const fullname =
    JSON.parse(window.sessionStorage.getItem("userdata"))["firstName"] +
    " " +
    JSON.parse(window.sessionStorage.getItem("userdata"))["lastName"];

  const { signOut, getAccessToken, getDecodedIDToken } = useAuthContext();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  getAccessToken()
    .then((accessToken) => {
      console.log(accessToken);
    })
    .catch((error) => {
      console.log(error);
    });

  getDecodedIDToken()
    .then((decodedIDToken) => {
      console.log(decodedIDToken);
    })
    .catch((error) => {
      // Handle the error
    });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <AppBar color="primary" position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ width: [25, 70] }} mr={[1, 4]}>
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
              }}
            >
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
              }}
            >
              Grama Seva
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem disabled>{fullname}</MenuItem>
                <MenuItem onClick={() => signOut()}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" color="info" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
      <Footer />
    </Box>
  );
}
export default GSDrawer;
