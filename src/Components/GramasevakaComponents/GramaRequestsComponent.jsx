import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import {
  Autocomplete,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from "@mui/icons-material/Cancel";
import InfoIcon from '@mui/icons-material/Info';
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// dummy data
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
    identityCheck: true,
    addressCheck: false,
    policeCheck: false,
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
    identityCheck: true,
    addressCheck: true,
    policeCheck: false,
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
    identityCheck: true,
    addressCheck: true,
    policeCheck: true,
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
    identityCheck: false,
    addressCheck: false,
    policeCheck: false,
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
    identityCheck: true,
    addressCheck: true,
    policeCheck: false,
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
    identityCheck: true,
    addressCheck: true,
    policeCheck: false,
  },
};

const sampleIdentityAPIResponse = {
  nic: '123456789V',
  name: 'John Doe',
  gender: 'Male',
  date_of_birth: '1998-10-10',
  place_of_birth: 'Colombo',
  occupation: 'Student',
  address: 'No. 123, Galle Road, Colombo 03',
}

const sampleAddressAPIResponse = [
  'John Doe',
  'Jane Doe',
  'Jack Doe',
  'Jill Doe',
]

const samplePoliceAPIResponse = [
  '6 months in county jail',
  '2 years of probation and restitution payment',
  '3 years in state prison',
]

const GramaRequestsComponent = () => {
  const [displayedRequests, setDisplayedRequests] = useState({});
  const [open, setOpen] = useState(false);
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [filteredStatuses, setFilteredStatuses] = useState([]);

  const [filtered, setFiltered] = useState(false);
  const [filteredRequests, setFilteredRequests] = useState({});
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedReq, setSelectedReq] = useState(null);

  const [changedStatus, setChangedStatus] = useState({
    reqId: selectedReq?.id,
    status: selectedReq?.status
  });
  const [identityCheckAccordian, setIdentityCheckAccordian] = useState(false);
  const [identityCheckDetails, setIdentityCheckDetails] = useState({
    set: false,
    response: null
  });
  const [addressCheckAccordian, setAddressCheckAccordian] = useState(false);
  const [addressCheckDetails, setAddressCheckDetails] = useState({
    set: false,
    response: null
  });
  const [policeCheckAccordian, setPoliceCheckAccordian] = useState(false);
  const [policeCheckDetails, setPoliceCheckDetails] = useState({
    set: false,
    response: null
  });

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

  function identityCheckAccordianChange() {
    setIdentityCheckAccordian(!identityCheckAccordian);
    if (!identityCheckAccordian) {
      if (!identityCheckDetails.set) {
        //backendCall to get details from external API
        console.log("backend call");
        setIdentityCheckDetails({
          set: true,
          response: sampleIdentityAPIResponse
        }
        )
      }
    }
  }

  function addressCheckAccordianChange() {
    setAddressCheckAccordian(!addressCheckAccordian);
    if (!addressCheckAccordian) {
      if (!addressCheckDetails.set) {
        //backendCall to get details from external API
        console.log("backend call");
        setAddressCheckDetails({
          set: true,
          response: sampleAddressAPIResponse
        }
        )
      }
    }
  }

  function policeCheckAccordianChange() {
    setPoliceCheckAccordian(!policeCheckAccordian);
    if (!policeCheckAccordian) {
      if (!policeCheckDetails.set) {
        //backendCall to get details from external API
        console.log("backend call");
        setPoliceCheckDetails({
          set: true,
          response: samplePoliceAPIResponse
        }
        )
      }
    }
  }



  function handleIdentityCheckDecline() {
    setSelectedReq({
      ...selectedReq,
      identityCheck: false,
    })
    // backend call to update the status

  }
  function handleIdentityCheckApprove() {
    setSelectedReq({
      ...selectedReq,
      identityCheck: true,
    })
    // backend call to update the status

  }

  function handleAddressCheckDecline() {
    setSelectedReq({
      ...selectedReq,
      addressCheck: false,
    })
    // backend call to update the status
    
  }
  function handleAddressCheckApprove() {
    setSelectedReq({
      ...selectedReq,
      addressCheck: true,
    })
    // backend call to update the status

  }

  function handlePoliceCheckDecline() {
    setSelectedReq({
      ...selectedReq,
      policeCheck: false,
    })
    // backend call to update the status

  }
  function handlePoliceCheckApprove() {
    setSelectedReq({
      ...selectedReq,
      policeCheck: true,
    })
    // backend call to update the status

  }



  return (
    <>
      {/* filter Dialog Box*/}
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
              sx={{ width: 300 }}
              value={filteredTypes}
              onChange={(event, value) => {
                setFilteredTypes(value);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Type" placeholder="Type" />
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
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Status" placeholder="Status" />
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

      {/* Preview Dialog Box */}
      <Dialog
        open={openPreview}
        onClose={() => {
          setOpenPreview(false);
          //TODO: save the changed status to backend 
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
          <Box sx={{ mb: 3, display: 'flex', gap: 3 }}>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                <b>Status</b>
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 400 }}>
                {selectedReq?.status}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                <b>Change Status</b>
              </Typography>
              <Select
                id="combo-box-demo"
                value={changedStatus.status}
                onChange={(event) => {
                  setChangedStatus(
                    {
                      reqId: selectedReq?.id,
                      status: event.target.value
                    });
                }}
                sx={{ width: 200 }}
              >
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
                <MenuItem value="NeedMoreInfo">NeedMoreInfo</MenuItem>
              </Select>
            </Box>
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
          <Box sx={{ mb: 3 }}>
            <Accordion onChange={identityCheckAccordianChange}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Identity Check : {selectedReq?.identityCheck ? 'Verified' : 'Not Verified'}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  <b>NIC : {selectedReq?.nic}</b>
                </Typography>

                <Typography variant="body1" sx={{ fontWeight: 400 }}>
                  <b>Name:</b> {identityCheckDetails.response?.name}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 400 }}>
                  <b>Gender:</b> {identityCheckDetails.response?.gender}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 400 }}>
                  <b>Date of Birth:</b> {identityCheckDetails.response?.date_of_birth}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 400 }}>
                  <b>Place of Birth:</b> {identityCheckDetails.response?.place_of_birth}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 400 }}>
                  <b>Occupation:</b> {identityCheckDetails.response?.occupation}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 400 }}>
                  <b>Address:</b> {identityCheckDetails.response?.address}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}>
                  <Button variant="outlined" color="error" onClick={handleIdentityCheckDecline}>
                    Decline
                  </Button>
                  <Button variant="outlined" color="success" onClick={handleIdentityCheckApprove}>
                    Approve
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion onChange={addressCheckAccordianChange}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Address Check : {selectedReq?.addressCheck ? 'Verified' : 'Not Verified'}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  <b>Address : {selectedReq?.address}</b>
                </Typography>

                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  <b>List of Residents : {addressCheckDetails.address}</b>
                </Typography>

                {addressCheckDetails.response?.map((resident, index) => (
                <Typography variant="body1" sx={{ fontWeight: 400 }} key={index}>
                  {resident}
                </Typography>
                  ))}

                <Box sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}>
                  <Button variant="outlined" color="error" onClick={handleAddressCheckDecline}>
                    Decline
                  </Button>
                  <Button variant="outlined" color="success" onClick={handleAddressCheckApprove}>
                    Approve
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion onChange={policeCheckAccordianChange}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Police Check : {selectedReq?.policeCheck ? 'Verified' : 'Not Verified'}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  <b>NIC : {selectedReq?.nic}</b>
                </Typography>

                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  <b>List of Criminal Records :</b>
                </Typography>

                {policeCheckDetails.response?.map((record, index) => (
                <Typography variant="body1" sx={{ fontWeight: 400 }} key={index}>
                  {record}
                </Typography>
                  ))}

                <Box sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}>
                  <Button variant="outlined" color="error" onClick={handlePoliceCheckDecline}>
                    Decline
                  </Button>
                  <Button variant="outlined" color="success" onClick={handlePoliceCheckApprove}>
                    Approve
                  </Button>
                </Box>
              </AccordionDetails>
            </Accordion>

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
              Certification Requests
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
                  setChangedStatus({
                    reqId: displayedRequests[request].id,
                    status: displayedRequests[request].status,
                  });
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
                    {displayedRequests[request].name}
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
  )
};

export default GramaRequestsComponent;
