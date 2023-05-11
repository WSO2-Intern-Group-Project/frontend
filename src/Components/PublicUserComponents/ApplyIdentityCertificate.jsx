import React from "react";
import { Box } from "@mui/system";
import { Button, Card, Typography } from "@mui/material";
import IdentityImage from "./nic.jpg";

const fullName = "John Doe";
const nic = "123456789V";

function ApplyIdentityComponent() {
  return (
    <>
      <Box>
        <Box>
          <Card
            sx={{
              p: 2,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              backgroundColor: "primary.main",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              height: "75%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 4,
                mt: 3,
              }}
            >
              Apply for Identity Certificate
            </Typography>

            <Box sx={{ width: "80%", mb: 2 }}>
              <Typography variant="body2">
                <b>Name:</b> {fullName}
              </Typography>

              <Typography variant="body2" sx={{}}>
                <b>NIC:</b> {nic}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "80%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                color="info"
                sx={{ width: "70%", borderRadius: 4 }}
              >
                Apply Now
              </Button>
            </Box>
          </Card>
          <Box
            sx={{
              mt: 10,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={IdentityImage} width="75%" />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ApplyIdentityComponent;
