import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button, Card, TextField, Typography } from "@mui/material";
import AddressImage from "./address.jpeg";
import { useAuthContext } from "@asgardeo/auth-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ApplyAdddressComponent() {
  const userdata = JSON.parse(window.sessionStorage.getItem("userdata"));
  const fullName = userdata["firstName"] + " " + userdata["lastName"];
  const email = userdata["email"];
  const address = userdata["address"];
  const nic = userdata["nic"];
  const gnDomain = userdata["gnDomain"];
  
  const [reason, setReason] = useState("");
  

  const { httpRequest } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    httpRequest({
      headers: {
        Accept: "application/json",
      },
      method: "POST",
      url: "https://a7bf0dba-d37a-4f74-ab2a-11d52f500ed9-prod.e1-us-east-azure.choreoapis.dev/bhzm/gramasevabackend/endpoint-9090-803/1.0.0/addRequest",
      attachToken: true,
      data: {
        requestType: "Address",
        requestedBy: fullName,
        userEmail: email,
        gnDomain: gnDomain,
        reason: reason,
        address: address,
        nic: nic,
      },
    })
      .then((response) => {
        toast.success("Request Submitted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          theme: "dark",
        });
        console.log(response);
      })
      .catch((err) => {
        toast.error("Request Submission Failed", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
          theme: "dark",
        });
        console.error(err);
      });

    setReason("");
  };

  return (
    <>
    <ToastContainer />
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
