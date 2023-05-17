import * as React from "react";
import { Box } from "@mui/system";
import { Button, Card } from "@mui/material";
import Picture from "./pic2.jpeg";
import Spacing from "../../Utils/Spacing";
import { NavLink } from "react-router-dom";

const pages = {
  "Apply for Address Certificate": "applyAddress",
  "Apply for Identity Certificate": "applyIdentity",
  "Check Status": "myRequests",
  "Help": "help",
};

function HomeComponent() {

  console.log(window.sessionStorage.getItem("userdata"));
  return (
    <>
      <Box>
        <Box
          sx={{
            mt: 15,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src={Picture} width="100%" />
        </Box>
        <Spacing size={160} />
        <Box>
          <Card
            sx={{
              p: 2,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              background: "linear-gradient(to bottom, #5a9a86,#2c5e4f,#213b32)",
            }}
          >
            {Object.keys(pages).map((page) => (
              <Button
                component={NavLink}
                to={pages[page]}
                variant="contained"
                color="primary"
                key={page}
                sx={{
                  width: "100%",
                  height: 40,
                  mb: 2,
                  mt: 2,
                  borderRadius: 10,
                }}
              >
                {page}
              </Button>
            ))}
          </Card>
        </Box>
      </Box>
    </>
  );
}

export default HomeComponent;
