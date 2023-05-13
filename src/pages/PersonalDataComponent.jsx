import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import HomeNavBar from "../Components/HomeNavBar";

export default function PersonalDataComponent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [nic, setNic] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <>
      <Box>
        <HomeNavBar />
      </Box>
      <Box
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          height: "75%",
          backgroundColor: "primary.main",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#fff",
          }}>
          Personal Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box>
            <TextField
              label="First Name"
              variant="filled"
              fullWidth
              required
              color="secondary"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{
                mb: 2,
                backgroundColor: "primary.light",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />
            <TextField
              label="Last Name"
              variant="filled"
              fullWidth
              required
              color="secondary"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              sx={{
                mb: 2,
                backgroundColor: "primary.light",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />
            <TextField
              label="Date of Birth"
              variant="filled"
              fullWidth
              required
              type="date"
              color="secondary"
              {...{
                InputLabelProps: { shrink: true },
              }}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              sx={{
                mb: 2,
                backgroundColor: "primary.light",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />
            <TextField
              label="NIC"
              variant="filled"
              fullWidth
              required
              color="secondary"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              sx={{
                mb: 2,
                backgroundColor: "primary.light",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />
            <TextField
              label="Gender"
              variant="filled"
              fullWidth
              required
              color="secondary"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              sx={{
                mb: 2,
                backgroundColor: "primary.light",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />
            <TextField
              label="Address"
              variant="filled"
              fullWidth
              required
              color="secondary"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{
                mb: 2,
                backgroundColor: "primary.light",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />
            <TextField
              label="Email"
              variant="filled"
              fullWidth
              required
              color="secondary"
              type={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                mb: 2,
                backgroundColor: "primary.light",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />
            <TextField
              label="Mobile Number"
              variant="filled"
              fullWidth
              required
              color="secondary"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              sx={{
                mb: 4,
                backgroundColor: "primary.light",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
            />
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="info"
            type="submit"
            sx={{
              borderRadius: 3,
            }}>
            Submit
          </Button>
        </form>
      </Box>
      <Box textAlign="center" pt={[2, 10]}>
        <Typography variant="body2" sx={{ fontSize: [14, 40] }}>
          © {new Date().getFullYear()} Grama Seva. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}
