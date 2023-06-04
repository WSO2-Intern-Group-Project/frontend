import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Autocomplete,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";
import InfoIcon from "@mui/icons-material/Info";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { backendBaseURL } from "../../Utils/endpoints";
import { useAuthContext } from "@asgardeo/auth-react";

function MyRequestsComponent() {
  const userdata = JSON.parse(window.sessionStorage.getItem("userdata"));
  const email = userdata["email"];

  const [displayedRequests, setDisplayedRequests] = useState({});
  const [open, setOpen] = useState(false);
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [filteredStatuses, setFilteredStatuses] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [filteredRequests, setFilteredRequests] = useState({});
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedReq, setSelectedReq] = useState(null);
  const [requests, setRequests] = useState({});

  const {httpRequest} = useAuthContext();

  useEffect(() => {
    httpRequest({
      headers: {
        Accept: "application/json",
      },
      method: "GET",
      url: backendBaseURL + "/requestsByUser?userEmail=" + email,
      attachToken: true,
    })
      .then((data) => {
        let requests = {};
        data.data.map((request, key) => {
          let k = key + 1;
          requests[k] = request;
        });
        setDisplayedRequests(
          Object.fromEntries(Object.entries(requests).slice(0, 5))
        );
        setRequests(requests);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleFilter() {
    const filteredRequests = Object.fromEntries(
      Object.entries(requests).filter(([id, request]) => {
        if (
          filteredTypes.includes(request.requestType) &&
          filteredStatuses.includes(request.overallStatus)
        ) {
          return true;
        }
        return false;
      })
    );
    setFilteredRequests(filteredRequests);
    setDisplayedRequests(
      Object.fromEntries(Object.entries(filteredRequests).slice(0, 5))
    );
    setFiltered(true);
    handleClose();
  }

  function selectIcon(status) {
    switch (status) {
      case "Completed":
        return <CheckCircleIcon sx={{ color: "success.main" }} />;
      case "Pending":
        return <PendingIcon sx={{ color: "info.light" }} />;
      case "Rejected":
        return <CancelIcon sx={{ color: "error.light" }} />;
      case "NeedMoreInfo":
        return <InfoIcon sx={{ color: "secondary.light" }} />;
      default:
        return null;
    }
  }
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Filter Requests</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ pb: 3 }}>
            Select the filters you want to apply
          </DialogContentText>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Autocomplete
              multiple
              filterSelectedOptions
              id="combo-box-demo"
              options={["Address", "Identity"]}
              getOptionLabel={(option) => option}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    color="info"
                    {...getTagProps({ index })}
                  />
                ))
              }
              sx={{ width: "100%" }}
              value={filteredTypes}
              onChange={(event, value) => {
                setFilteredTypes(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Type"
                  placeholder="Type"
                  variant="filled"
                  color="info"
                  sx={{
                    p: 1,
                    backgroundColor: "primary.light",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
              )}
            />
            <Autocomplete
              multiple
              filterSelectedOptions
              id="combo-box-demo"
              options={["Completed", "Pending", "Rejected", "NeedMoreInfo"]}
              getOptionLabel={(option) => option}
              value={filteredStatuses}
              onChange={(event, value) => {
                setFilteredStatuses(value);
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    color="info"
                    {...getTagProps({ index })}
                  />
                ))
              }
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Status"
                  placeholder="Status"
                  variant="filled"
                  color="info"
                  sx={{
                    p: 1,
                    backgroundColor: "primary.light",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" color="success" onClick={handleFilter}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openPreview}
        onClose={() => {
          setOpenPreview(false);
        }}
        fullWidth
      >
        <DialogTitle>{selectedReq?.requestType}</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              <b>Name</b>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 400 }}>
              {selectedReq?.requestedBy}
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              <b>Applied Date</b>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 400 }}>
              {selectedReq?.requestedDate}
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              <b>Status</b>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 400 }}>
              {selectedReq?.overallStatus}
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              <b>
                {selectedReq?.requestType === "Address" ? "Address" : "NIC"}
              </b>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 400 }}>
              {selectedReq?.requestType === "Address"
                ? selectedReq?.address
                : selectedReq?.nic}
            </Typography>
          </Box>
          {selectedReq?.requestType === "Address" && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                <b>Grama Niladari Domain</b>
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 400 }}>
                {selectedReq?.gnDomain}
              </Typography>
            </Box>
          )}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              <b>Reason</b>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 400 }}>
              {selectedReq?.reason}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setOpenPreview(false);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

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
              My Requests
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                color={"secondary"}
                startIcon={
                  filtered ? (
                    <FilterAltOffIcon color="secondary" />
                  ) : (
                    <FilterAltIcon color="secondary" />
                  )
                }
                onClick={() => {
                  if (filtered) {
                    setFiltered(false);
                    setFilteredTypes([]);
                    setFilteredStatuses([]);
                    setDisplayedRequests(
                      Object.fromEntries(Object.entries(requests).slice(0, 5))
                    );
                  } else {
                    handleOpen();
                  }
                }}
              >
                {filtered ? "clear filters" : "filter requests"}
              </Button>
            </Box>
            {Object.keys(displayedRequests).map((request) => (
              <Card
                key={request}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 4,
                  borderRadius: 5,
                  width: "90%",
                  backgroundColor: "primary.light",
                }}
                onClick={() => {
                  setSelectedReq(displayedRequests[request]);
                  setOpenPreview(true);
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    {displayedRequests[request].requestType} Certificate
                  </Typography>
                  <Typography variant="caption">
                    {displayedRequests[request].requestedDate}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                  }}
                >
                  {selectIcon(displayedRequests[request].overallStatus)}
                  <Typography variant="body1">
                    {displayedRequests[request].overallStatus}
                  </Typography>
                </Box>
              </Card>
            ))}
            <Pagination
              count={
                filtered
                  ? Math.ceil(Object.keys(filteredRequests).length / 5)
                  : Math.ceil(Object.keys(requests).length / 5)
              }
              onChange={(event, page) => {
                const start = (page - 1) * 5;
                const end = start + 5;
                setDisplayedRequests(
                  Object.fromEntries(
                    filtered
                      ? Object.entries(filteredRequests).slice(start, end)
                      : Object.entries(requests).slice(start, end)
                  )
                );
              }}
              color="secondary"
            />
          </Card>
        </Box>
      </Box>
    </>
  );
}

export default MyRequestsComponent;
