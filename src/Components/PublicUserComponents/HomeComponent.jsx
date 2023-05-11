import * as React from "react";
import { Box } from "@mui/system";
import { Button, Card } from "@mui/material";
import Picture from "./pic.png";
import Spacing from "../../Utils/Spacing";
import { NavLink } from "react-router-dom";

const pages = {
  "Apply for Address Certificate": "applyAddress",
  "Apply for Identity Certificate": "applyIdentity",
  "Check Status": "myRequests",
  "Help": "help",
};

function HomeComponent() {
  return (
    <>
      <Box>
        <Box
          sx={{
            mt: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src={Picture} width="80%" />
        </Box>
        <Spacing size={150} />
        <Box>
          <Card
            sx={{
              p: 2,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: "#bfcc94",
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
