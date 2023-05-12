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

const requests = {
  1: {
    id: 1,
    name: "John Doe",
    type: "Address Certificate",
    date: "12/12/2021",
    address: "123, ABC Street, XYZ City",
    status: "Pending",
    reason: "This is a sample reason, This is a sample reason",
    gsDivision: "ABC",
  },
  2: {
    id: 2,
    name: "Jane Doe",
    type: "Identity Certificate",
    date: "12/12/2021",
    address: "123, ABC Street, XYZ City",
    status: "Rejected",
    reason: "This is a sample reason, This is a sample reason",
    nic: "123456789V",
  },
  3: {
    id: 3,
    name: "John Doe",
    type: "Address Certificate",
    date: "12/02/2021",
    address: "123, ABC Street, XYZ City",
    status: "Completed",
    reason: "This is a sample reason, This is a sample reason",
    gsDivision: "ABC",
  },
  4: {
    id: 4,
    name: "Jane Doe",
    type: "Identity Certificate",
    date: "12/12/2021",
    address: "123, ABC Street, XYZ City",
    status: "Pending",
    reason: "This is a sample reason, This is a sample reason",
    nic: "123456789V",
  },
  5: {
    id: 5,
    name: "John Doe",
    type: "Address Certificate",
    date: "12/12/2021",
    address: "123, ABC Street, XYZ City",
    status: "NeedMoreInfo",
    reason: "This is a sample reason, This is a sample reason",
    gsDivision: "ABC",
  },
  6: {
    id: 6,
    name: "John Doe",
    type: "Identity Certificate",
    date: "12/09/2021",
    address: "123, ABC Street, XYZ City",
    status: "Pending",
    reason: "This is a sample reason, This is a sample reason",
    nic: "123456789V",
  },
};

function MyRequestsComponent() {
  const [displayedRequests, setDisplayedRequests] = useState({});
  const [open, setOpen] = useState(false);
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [filteredStatuses, setFilteredStatuses] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [filteredRequests, setFilteredRequests] = useState({});
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedReq, setSelectedReq] = useState(null);

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
          filteredTypes.includes(request.type) &&
          filteredStatuses.includes(request.status)
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

  useEffect(() => {
    setDisplayedRequests(
      Object.fromEntries(Object.entries(requests).slice(0, 5))
    );
  }, []);

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
              options={["Address Certificate", "Identity Certificate"]}
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
        <DialogTitle>{selectedReq?.type}</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              <b>Name</b>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 400 }}>
              {selectedReq?.name}
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              <b>Applied Date</b>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 400 }}>
              {selectedReq?.date}
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              <b>Status</b>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 400 }}>
              {selectedReq?.status}
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              <b>
                {selectedReq?.type === "Address Certificate"
                  ? "Address"
                  : "NIC"}
              </b>
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 400 }}>
              {selectedReq?.type === "Address Certificate"
                ? selectedReq?.address
                : selectedReq?.nic}
            </Typography>
          </Box>
          {selectedReq?.type === "Address Certificate" && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                <b>Grama Niladari Division</b>
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 400 }}>
                {selectedReq?.gsDivision}
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
                    {displayedRequests[request].type}
                  </Typography>
                  <Typography variant="caption">
                    {displayedRequests[request].date}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                  }}
                >
                  {selectIcon(displayedRequests[request].status)}
                  <Typography variant="body1">
                    {displayedRequests[request].status}
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
