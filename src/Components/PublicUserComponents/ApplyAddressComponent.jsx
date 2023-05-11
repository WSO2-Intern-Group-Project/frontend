import React from "react";
import { Box } from "@mui/system";
import { Button, Card, Typography } from "@mui/material";
import AddressImage from "./address.jpeg";

const fullName = "John Doe";
const address = "123, ABC Street, XYZ City, ABC State, 123456";

function ApplyAdddressComponent() {
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
              Apply for Address Certificate
            </Typography>

            <Box sx={{ width: "80%", mb: 2 }}>
              <Typography variant="body2">
                <b>Name:</b> {fullName}
              </Typography>

              <Typography variant="body2" sx={{}}>
                <b>Address:</b> {address}
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
            <img src={AddressImage} width="80%" />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ApplyAdddressComponent;
