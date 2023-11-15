import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const ViewAllCustomers = () => {
  const [allCustomer, setAllCustomer] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const allUsers = await retrieveAllUser();
        if (allUsers) {
          setAllCustomer(allUsers.users);
        }
      } catch (error) {
        handleSnackbarOpen("Error fetching customers", "error");
      }
    };

    getAllUsers();
  }, []);

  const retrieveAllUser = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/user/fetch/role-wise?role=Customer",
      {
        headers: {
          Authorization: "Bearer " + admin_jwtToken, // Replace with your actual JWT token
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <Container>
      <Paper
        elevation={3}
        sx={{
          mt: 3,
          p: 2,
          height: "45rem",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            backgroundColor: "Blue", // Replace with your background color
            borderRadius: "1em",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white", // Text color
          }}
        >
          All Customers
        </Typography>
        <TableContainer
          sx={{
            overflowY: "auto",
          }}
        >
          <Table className="table table-hover text-color text-center">
            <TableHead>
              <TableRow>
                <TableCell scope="col">First Name</TableCell>
                <TableCell scope="col">Last Name</TableCell>
                <TableCell scope="col">Email Id</TableCell>
                <TableCell scope="col">Phone No</TableCell>
                <TableCell scope="col">Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allCustomer.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <b>{customer.firstName}</b>
                  </TableCell>
                  <TableCell>
                    <b>{customer.lastName}</b>
                  </TableCell>
                  <TableCell>
                    <b>{customer.emailId}</b>
                  </TableCell>
                  <TableCell>
                    <b>{customer.phoneNo}</b>
                  </TableCell>
                  <TableCell>
                    <b>
                      {`${customer.address.street}, ${customer.address.city}, ${customer.address.postcode}`}
                    </b>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default ViewAllCustomers;
