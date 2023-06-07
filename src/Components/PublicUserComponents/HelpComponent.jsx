import React, { useState } from "react";
import { Box } from "@mui/system";
import { Button, Card, TextField, Typography } from "@mui/material";
import HelpImage from "./help.jpg";
import { useAuthContext } from "@asgardeo/auth-react";
import { backendBaseURL } from "../../Utils/endpoints";
import { ToastContainer, toast } from "react-toastify";

function HelpComponent() {
  const fullname =
    JSON.parse(window.sessionStorage.getItem("userdata"))["firstName"] +
    " " +
    JSON.parse(window.sessionStorage.getItem("userdata"))["lastName"];
  const email = JSON.parse(window.sessionStorage.getItem("userdata"))["email"];
  const [issue, setIssue] = useState("");
  const { httpRequest } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formatedIssue = `Name: ${fullname}\nEmail: ${email}\nIssue: ${issue}`;
    console.log(formatedIssue);

    httpRequest({
      headers: {
        Accept: "application/json",
      },
      method: "POST",
      url: backendBaseURL + "/help",
      attachToken: true,
      data: {
        message: formatedIssue,
      },
    })
      .then((data) => {
        toast.success("Issue Submitted successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          theme: "dark",
        });
      })
      .catch((err) => {
        toast.error("Message not sent", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          theme: "dark",
        });
      });
    setIssue("");
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
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 4,
              }}
            >
              Help
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                mb: 4,
              }}
            >
              Please write your issue below and we will get back to you as soon
              as possible.
            </Typography>
            <Box sx={{ width: "80%" }}>
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
                    placeholder="Write your issue here"
                    variant="standard"
                    multiline
                    rows={5}
                    fullWidth
                    sx={{
                      p: 1,
                      mb: 2,
                      backgroundColor: "primary.light",
                      borderRadius: 5,
                    }}
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="info"
                    sx={{ width: "70%", borderRadius: 4 }}
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </Box>
          </Card>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={HelpImage} width="70%" />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default HelpComponent;
