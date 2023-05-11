import React, {useState} from "react";
import { Box } from "@mui/system";
import { Button, Card, TextField, Typography } from "@mui/material";
import AddressImage from "./address.jpeg";

const fullName = "John Doe";
const address = "123, ABC Street, XYZ City, ABC State, 123456";

function ApplyAdddressComponent() {
    const [reason, setReason] = useState("");
    const [gnDivision, setGnDivision] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(reason);
        console.log(gnDivision);
        setReason("");
        setGnDivision("");
    };

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
            <Box sx={{ width: "80%", mb: 2 }}>
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <TextField
                    required
                    id="outlined-basic"
                    label="Grama Niladhari Division"
                    color="secondary"
                    variant="filled"
                    sx={{
                      width: "100%",
                      mb: 2,
                      backgroundColor: "primary.light",
                      borderRadius: 3,
                    }}
                    value={gnDivision}
                    onChange={(e) => setGnDivision(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Reason"
                    color="secondary"
                    variant="filled"
                    multiline
                    rows={4}
                    sx={{
                      width: "100%",
                      mb: 2,
                      backgroundColor: "primary.light",
                      borderRadius: 3,
                    }}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="info"
                    sx={{ width: "80%", borderRadius: 2 }}
                  >
                    Apply Now
                  </Button>
                </Box>
              </form>
            </Box>
          </Card>
          <Box
            sx={{
              mt: 3,
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
