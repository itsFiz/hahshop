import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();

  const seller = JSON.parse(sessionStorage.getItem("active-seller"));

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    phoneNo: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
  });

  useEffect(() => {
    if (document.URL.indexOf("customer") !== -1) {
      setUser({ ...user, role: "Customer" });
    } else if (document.URL.indexOf("delivery") !== -1) {
      setUser({ ...user, role: "Delivery" });
    } else if (document.URL.indexOf("seller") !== -1) {
      setUser({ ...user, role: "Seller" });
    }
  }, []);

  const handleUserInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const saveUser = (e) => {
    e.preventDefault();

    let jwtToken;

    if (user.role === "Delivery") {
      user.sellerId = seller.id;
      // jwtToken = sessionStorage.getItem("seller-jwtToken"); // Use bank's JWT token for customer register
    }

    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Authorization: "Bearer " + jwtToken,
      },
      body: JSON.stringify(user),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          if (res.success) {
            handleSnackbarOpen(res.responseMessage, "success");

            setTimeout(() => {
              navigate("/user/login");
            }, 1000);
          } else if (!res.success) {
            handleSnackbarOpen(res.responseMessage, "error");

            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          } else {
            handleSnackbarOpen("It seems the server is down", "error");

            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        handleSnackbarOpen("It seems the server is down", "error");
        setTimeout(() => {
          window.location.reload(true);
        }, 1000); // Redirect after 3 seconds
      });
    e.preventDefault();
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper sx={{ p: 4, width: "50rem" }}>
        <Typography
          variant="h5"
          sx={{
            backgroundColor: "Blue", // Replace with your background color
            borderRadius: "1em",
            height: "45px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Registration Page
        </Typography>
        <form onSubmit={saveUser}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                id="firstName"
                name="firstName"
                onChange={handleUserInput}
                value={user.firstName}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                id="lastName"
                name="lastName"
                onChange={handleUserInput}
                value={user.lastName}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email Id"
                id="emailId"
                name="emailId"
                onChange={handleUserInput}
                value={user.emailId}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Password"
                id="password"
                name="password"
                type="password"
                onChange={handleUserInput}
                value={user.password}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Contact No"
                id="phoneNo"
                name="phoneNo"
                type="number"
                onChange={handleUserInput}
                value={user.phoneNo}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Street"
                id="street"
                name="street"
                multiline
                rows={3}
                onChange={handleUserInput}
                value={user.street}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="City"
                id="city"
                name="city"
                onChange={handleUserInput}
                value={user.city}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Pincode"
                id="pincode"
                name="pincode"
                type="number"
                onChange={handleUserInput}
                value={user.pincode}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="role">
                  <b>User Role</b>
                </InputLabel>
                <Select
                  id="role"
                  name="role"
                  value={user.role}
                  onChange={handleUserInput}
                >
                  <MenuItem value="Customer">Customer</MenuItem>
                  <MenuItem value="Delivery">Delivery Person</MenuItem>
                  <MenuItem value="Seller">Seller</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "16px 0",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Register User
            </Button>
          </div>
        </form>
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
      </Paper>
    </Container>
  );
};

export default UserRegister;
