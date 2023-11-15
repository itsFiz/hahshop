import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  Typography,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ViewAllSellers = () => {
  const [allSeller, setAllSeller] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const seller = JSON.parse(sessionStorage.getItem("active-seller"));
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  let navigate = useNavigate();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await retrieveAllUser();
        if (response.success) {
          setAllSeller(response.users);
        } else {
          handleSnackbar("Error: " + response.responseMessage, "error");
        }
      } catch (error) {
        handleSnackbar("Error: Server is down", "error");
      }
    };

    getAllUsers();
  }, []);

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/fetch/role-wise?role=Seller",
      {
        headers: {
          Authorization: "Bearer " + admin_jwtToken,
        },
      }
    );
    return response.data;
  };

  const deleteSeller = (userId) => {
    fetch("http://localhost:8080/api/user/delete/seller?sellerId=" + userId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + admin_jwtToken,
      },
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            handleSnackbar(res.responseMessage, "success");
            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Reload after 1 second
          } else if (!res.success) {
            handleSnackbar(res.responseMessage, "error");
          }
        });
      })
      .catch((error) => {
        console.error(error);
        handleSnackbar("Error: Server is down", "error");
      });
  };

  const handleSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container className="mt-3">
      <Paper
        elevation={3}
        className="card form-card ms-2 me-2 mb-5 custom-bg shadow-lg"
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >
          <Typography variant="h4">All Sellers</Typography>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email Id</TableCell>
                  <TableCell>Phone No</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allSeller.map((seller) => (
                  <TableRow key={seller.id}>
                    <TableCell>
                      <b>{seller.firstName}</b>
                    </TableCell>
                    <TableCell>
                      <b>{seller.lastName}</b>
                    </TableCell>
                    <TableCell>
                      <b>{seller.emailId}</b>
                    </TableCell>
                    <TableCell>
                      <b>{seller.phoneNo}</b>
                    </TableCell>
                    <TableCell>
                      <b>
                        {seller.address.street +
                          ", " +
                          seller.address.city +
                          ", " +
                          seller.address.postcode}
                      </b>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => deleteSeller(seller.id)}
                        variant="outlined"
                        color="error"
                        size="small"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ViewAllSellers;
