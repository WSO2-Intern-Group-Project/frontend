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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";
import InfoIcon from "@mui/icons-material/Info";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { externalAPIsBaseURL, backendBaseURL } from "../../Utils/endpoints";
import { useAuthContext } from "@asgardeo/auth-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GramaRequestsComponent = () => {
  const gnDomain = JSON.parse(window.sessionStorage.getItem("userdata"))[
    "gnDomain"
  ];

  const [displayedRequests, setDisplayedRequests] = useState({});
  const [open, setOpen] = useState(false);
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [filteredStatuses, setFilteredStatuses] = useState([]);

  const [filtered, setFiltered] = useState(false);
  const [filteredRequests, setFilteredRequests] = useState({});
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedReq, setSelectedReq] = useState(null);
  const [selectedRid, setSelectedRid] = useState("");
  const [req, setReq] = useState(null);

  const [changedStatus, setChangedStatus] = useState({
    reqId: selectedReq?.id,
    status: selectedReq?.overallStatus,
  });
  const [apiData, setApiData] = useState(null);
  const [identityCheckDetails, setIdentityCheckDetails] = useState({
    set: false,
    response: null,
  });
  const [addressCheckDetails, setAddressCheckDetails] = useState({
    set: false,
    response: null,
  });
  const [policeCheckDetails, setPoliceCheckDetails] = useState({
    set: false,
    response: null,
  });

  const [requests, setRequests] = useState({});
  const { httpRequest } = useAuthContext();

  useEffect(() => {
    httpRequest({
      headers: {
        Accept: "application/json",
      },
      method: "GET",
      url: backendBaseURL + "/requestsByDomain?gnDomain=" + gnDomain,
      attachToken: true,
    })
      .then((data) => {
        let requests = {};
        let api = {};
        data.data.map((request, key) => {
          let k = key + 1;
          requests[k] = request;
          api[k] = {
            identityCheckDetails: null,
            addressCheckDetails: null,
            policeCheckDetails: null,
          };
        });
        setDisplayedRequests(
          Object.fromEntries(Object.entries(requests).slice(0, 5))
        );
        setRequests(requests);
        setApiData(api);
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

  function identityCheckAccordianChange() {
    if (!identityCheckDetails.set) {
      httpRequest({
        headers: {
          Accept: "application/json",
        },
        method: "GET",
        url:
          externalAPIsBaseURL + "/identityRecordByNIC?nic=" + selectedReq.nic,
        attachToken: true,
      })
        .then((data) => {
          setIdentityCheckDetails({
            set: true,
            response: data.data,
          });

          const copy = { ...apiData };
          copy[selectedRid].identityCheckDetails = {
            set: true,
            response: data.data,
          };
          setApiData(copy);
        })
        .catch(() => {
          toast.info("Identity Data Unavailable", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            theme: "dark",
          });
        });
    }
  }

  function addressCheckAccordianChange() {
    if (!addressCheckDetails.set) {
      httpRequest({
        headers: {
          Accept: "application/json",
        },
        method: "POST",
        url: externalAPIsBaseURL + "/residentsByAddress",
        attachToken: true,
        data: {
          address: selectedReq.address,
        },
      })
        .then((data) => {
          const newdata = Object.keys(data.data).map((k) => {
            return data.data[k].name + " - " + data.data[k].NIC;
          });
          setAddressCheckDetails({
            set: true,
            response: newdata,
          });

          const copy = { ...apiData };
          copy[selectedRid].addressCheckDetails = {
            set: true,
            response: newdata,
          };
          setApiData(copy);
        })
        .catch(() => {
          toast.info("Residents Data unavailable", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            theme: "dark",
          });
        });
    }
  }

  function policeCheckAccordianChange() {
    if (!policeCheckDetails.set) {
      httpRequest({
        headers: {
          Accept: "application/json",
        },
        method: "GET",
        url: externalAPIsBaseURL + "/policeRecordsByNIC?nic=" + selectedReq.nic,
        attachToken: true,
      })
        .then((data) => {
          console.log(data);
          const newdata = Object.keys(data.data).map((k) => {
            return data.data[k].description;
          });
          setPoliceCheckDetails({
            set: true,
            response: newdata,
          });

          const copy = { ...apiData };
          copy[selectedRid].policeCheckDetails = {
            set: true,
            response: newdata,
          };
          setApiData(copy);
        })
        .catch((err) => {
          toast.info("Police Data unavailable", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
            theme: "dark",
          });
        });
    }
  }

  function handleIdentityCheckDecline() {
    const copy = { ...selectedReq };
    copy.identityVerificationStatus = true;
    copy.identityVerified = false;
    setSelectedReq(copy);
    const data = { ...displayedRequests };
    data[selectedRid] = copy;
    setDisplayedRequests(data);
  }

  function handleIdentityCheckApprove() {
    const copy = { ...selectedReq };
    copy.identityVerificationStatus = true;
    copy.identityVerified = true;
    setSelectedReq(copy);
    const data = { ...displayedRequests };
    data[selectedRid] = copy;
    setDisplayedRequests(data);
  }

  function handleAddressCheckDecline() {
    const copy = { ...selectedReq };
    copy.addressVerificationStatus = true;
    copy.addressVerified = false;
    setSelectedReq(copy);
    const data = { ...displayedRequests };
    data[selectedRid] = copy;
    setDisplayedRequests(data);
  }

  function handleAddressCheckApprove() {
    const copy = { ...selectedReq };
    copy.addressVerificationStatus = true;
    copy.addressVerified = true;
    setSelectedReq(copy);
    const data = { ...displayedRequests };
    data[selectedRid] = copy;
    setDisplayedRequests(data);
  }

  function handlePoliceCheckDecline() {
    const copy = { ...selectedReq };
    copy.policeVerificationStatus = true;
    copy.policeVerified = false;
    setSelectedReq(copy);
    const data = { ...displayedRequests };
    data[selectedRid] = copy;
    setDisplayedRequests(data);
  }

  function handlePoliceCheckApprove() {
    const copy = { ...selectedReq };
    copy.policeVerificationStatus = true;
    copy.policeVerified = true;
    setSelectedReq(copy);
    const data = { ...displayedRequests };
    data[selectedRid] = copy;
    setDisplayedRequests(data);
  }

  function handleApply() {
    httpRequest({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      url: backendBaseURL + "/setStatusOfRequest",
      data: selectedReq,
      attachToken: true,
    })
      .then((data) => {
        toast.success("Request updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          theme: "dark",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <ToastContainer />
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
                <b>Grama Niladari Division</b>
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
          <Box sx={{ mb: 3, display: "flex" }}>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 700 }}>
                <b>Request Status</b>
              </Typography>
              <Select
                id="combo-box-demo"
                value={selectedReq?.overallStatus}
                onChange={(event) => {
                  setChangedStatus({
                    reqId: selectedReq?.id,
                    status: event.target.value,
                  });
                  const copy = { ...selectedReq };
                  copy.overallStatus = event.target.value;
                  setSelectedReq(copy);
                  const data = { ...displayedRequests };
                  data[selectedRid] = copy;
                  setDisplayedRequests(data);
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
            <Accordion onChange={identityCheckAccordianChange}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  Identity Check :{" "}
                  {selectedReq?.identityVerificationStatus
                    ? selectedReq?.identityVerified
                      ? "Approved"
                      : "Declined"
                    : "Not Verified"}
                </Typography>
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
                  <b>Date of Birth:</b> {identityCheckDetails.response?.DoB}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 400 }}>
                  <b>Place of Birth:</b>{" "}
                  {identityCheckDetails.response?.placeOfBirth}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 400 }}>
                  <b>Occupation:</b> {identityCheckDetails.response?.occupation}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 400 }}>
                  <b>Address:</b> {identityCheckDetails.response?.address}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    mt: 3,
                  }}
                >
                  {!selectedReq?.identityVerificationStatus && (
                    <Box>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleIdentityCheckDecline}
                      >
                        Decline
                      </Button>
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={handleIdentityCheckApprove}
                      >
                        Approve
                      </Button>
                    </Box>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion onChange={addressCheckAccordianChange}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  Address Check :{" "}
                  {selectedReq?.addressVerificationStatus
                    ? selectedReq?.addressVerified
                      ? "Approved"
                      : "Declined"
                    : "Not Verified"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  <b>Address : {selectedReq?.address}</b>
                </Typography>

                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  <b>List of Residents : {addressCheckDetails.address}</b>
                </Typography>

                {addressCheckDetails.response?.map((resident, index) => (
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 400 }}
                    key={index}
                  >
                    {resident}
                  </Typography>
                ))}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    mt: 3,
                  }}
                >
                  {!selectedReq?.addressVerificationStatus && (
                    <Box>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleAddressCheckDecline}
                      >
                        Decline
                      </Button>
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={handleAddressCheckApprove}
                      >
                        Approve
                      </Button>
                    </Box>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion onChange={policeCheckAccordianChange}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  Police Check :{" "}
                  {selectedReq?.policeVerificationStatus
                    ? selectedReq?.policeVerified
                      ? "Approved"
                      : "Declined"
                    : "Not Verified"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  <b>NIC : {selectedReq?.nic}</b>
                </Typography>

                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  <b>List of Criminal Records :</b>
                </Typography>

                {policeCheckDetails.response?.map((record, index) => (
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 400 }}
                    key={index}
                  >
                    {record}
                  </Typography>
                ))}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    mt: 3,
                  }}
                >
                  {!selectedReq?.policeVerificationStatus && (
                    <Box>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handlePoliceCheckDecline}
                      >
                        Decline
                      </Button>
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={handlePoliceCheckApprove}
                      >
                        Approve
                      </Button>
                    </Box>
                  )}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              const data = { ...displayedRequests };
              data[selectedRid] = req;
              setDisplayedRequests(data);
              setOpenPreview(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              handleApply();
              setOpenPreview(false);
            }}
          >
            Apply
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
                    status: displayedRequests[request].overallStatus,
                  });
                  setSelectedReq(displayedRequests[request]);
                  setSelectedRid(request);
                  setReq(displayedRequests[request]);

                  setIdentityCheckDetails(
                    apiData[request].identityCheckDetails
                      ? apiData[request].identityCheckDetails
                      : { set: false, response: null }
                  );
                  setPoliceCheckDetails(
                    apiData[request].policeCheckDetails
                      ? apiData[request].policeCheckDetails
                      : { set: false, response: null }
                  );
                  setAddressCheckDetails(
                    apiData[request].addressCheckDetails
                      ? apiData[request].addressCheckDetails
                      : { set: false, response: null }
                  );
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
                    {displayedRequests[request].requestType}
                  </Typography>
                  <Typography variant="caption">
                    {displayedRequests[request].requestedBy}
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
};

export default GramaRequestsComponent;
