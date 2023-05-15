import * as React from "react";
import { Box, Typography, Button, useMediaQuery, Backdrop, TextField } from "@mui/material";
import RoleImage from "../../assets/images/role-image.png";
import HomeNavBar from "../../Components/HomeNavBar";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function RoleSelectPage() {
  const [open, setOpen] = React.useState(false);
  const isMobileScreen = useMediaQuery("(max-width: 767px)");
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f0f4ef",
          height: "100vh",
          textAlign: "center",
          justifyContent: "center",
        }}>
        <HomeNavBar />
        <Box
          sx={{
            alignItems: "center",
            backgroundColor: "#0D1821",
            height: [380, 300],
            borderRadius: ["0 0 50px 50px", "0 0 0 0"],
          }}>
          <Box width={[200, 200]} mx="auto" pt={[10, 5]}>
            <img src={RoleImage} alt="SignIn" style={{ width: "100%" }} />
          </Box>
        </Box>
        <Box px={[5, 60]} pt={[10, 3]} height={[290, 290]}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, fontSize: [20, 25] }}>
            Select your role
          </Typography>
          <Box mb={5} />
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
                fontSize: "0.8rem",
                padding: "8px 20px",
              },
            }}
            onClick={handleOpen}>
            Grama Niladhari
          </Button>
          <Box mb={[3, 2]} />
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
                fontSize: "0.8rem",
                padding: "8px 20px",
              },
            }}
            onClick={() => navigate("/personalData")}>
            General User
          </Button>
        </Box>
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "rgba(191, 204, 148, 0.9)",
          }}
          open={open}>
          <Box
            sx={{ backgroundColor: "#f0f4ef", borderRadius: 5, boxShadow: 12 }}
            width={[325, 700]}
            py={5}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: 900, color: "#000000", fontSize: 30 }}>
              Grama Seva
            </Typography>
            <Box sx={{ width: 100 }} mx="auto" my={[3, 3]}>
              <img src={logo} alt="logo" style={{ width: "100%" }} />
            </Box>
            <Typography variant="body1" gutterBottom sx={{ color: "#000000", fontSize: [15, 22] }}>
              Grama Niladhari Registration Number
            </Typography>
            <Box width={[265, 500]} mx="auto" mt={2} mb={["auto", 5]}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                fullWidth
                sx={{
                  "@media (max-width: 600px)": {
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 5,
                    },
                  },
                  "@media (min-width: 600px)": {
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 15,
                    },
                  },
                }}
              />
              <Box mb={2} />
              <Button
                fullWidth
                variant="contained"
                sx={{
                  borderRadius: 50,
                  backgroundColor: "#BFCC94",
                  "&:hover": {
                    backgroundColor: "#abb785",
                    borderColor: "#BFCC94",
                    boxShadow: "none",
                  },
                  "&:active": {
                    boxShadow: "none",
                    backgroundColor: "#8a376",
                    borderColor: "#BFCC94",
                  },
                  "&:focus": {
                    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
                  },
                  textAlign: "left",
                  "& .MuiButton-startIcon": {
                    margin: 0,
                  },
                  
                }}
                onClick={handleClose}>
                Back
              </Button>
              <Box mb={2} />
              <Button
                fullWidth
                variant="contained"
                sx={{
                  borderRadius: 50,
                  backgroundColor: "#344966",
                  "&:hover": {
                    backgroundColor: "#293a51",
                    borderColor: "#344966",
                    boxShadow: "none",
                  },
                  "&:active": {
                    boxShadow: "none",
                    backgroundColor: "#5c6d84",
                    borderColor: "#344966",
                  },
                  "&:focus": {
                    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
                  },
                  textAlign: "left",
                  "& .MuiButton-startIcon": {
                    margin: 0,
                  },
                  
                }}>
                Submit
              </Button>
            </Box>
          </Box>
        </Backdrop>
        <Box>
          <Typography variant="body2" sx={{ fontSize: 14 }}>
            © {new Date().getFullYear()} Grama Seva. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
}
