import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
  Container,
  Paper,
  Box
} from "@mui/material";
import { Alert } from "@mui/lab";

import { useNavigate } from "react-router-dom";



const UserLoginForm = () => {
  const navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleUserInput = (e) => {
    setLoginRequest({ ...loginRequest, [e.target.name]: e.target.value });
  };

  const loginAction = (e) => {
    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginRequest),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          if (res.success) {
            console.log("Got the success response");

            if (res.jwtToken !== null) {
              if (res.user.role === "Admin") {
                sessionStorage.setItem(
                  "active-admin",
                  JSON.stringify(res.user)
                );
                sessionStorage.setItem("admin-jwtToken", res.jwtToken);
              } else if (res.user.role === "Customer") {
                sessionStorage.setItem(
                  "active-customer",
                  JSON.stringify(res.user)
                );
                sessionStorage.setItem("customer-jwtToken", res.jwtToken);
              } else if (res.user.role === "Seller") {
                sessionStorage.setItem(
                  "active-seller",
                  JSON.stringify(res.user)
                );
                sessionStorage.setItem("seller-jwtToken", res.jwtToken);
              } else if (res.user.role === "Delivery") {
                sessionStorage.setItem(
                  "active-delivery",
                  JSON.stringify(res.user)
                );
                sessionStorage.setItem("delivery-jwtToken", res.jwtToken);
              }
            }

            if (res.jwtToken !== null) {
              setSnackbarSeverity("success");
              setSnackbarMessage(res.responseMessage);
              setOpenSnackbar(true);

              setTimeout(() => {
                navigate("/home");
              }, 1000); // Redirect after 3 seconds
            } else {
              setSnackbarSeverity("error");
              setSnackbarMessage(res.responseMessage);
              setOpenSnackbar(true);
            }
          } else {
            setSnackbarSeverity("error");
            setSnackbarMessage(res.responseMessage);
            setOpenSnackbar(true);
          }
        });
      })
      .catch((error) => {
        console.error(error);
        setSnackbarSeverity("error");
        setSnackbarMessage("It seems the server is down");
        setOpenSnackbar(true);
      });

    e.preventDefault();
  };
  

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
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
      <Paper sx={{ p: 4, width: "25rem" }} elevation={3}>
        <Typography
          variant="h3" // Larger font size
          fontFamily="Roboto" // Roboto font
          textAlign="center"
          sx={{ mt: 2 }}
        >
          Login Page
        </Typography>
        <form>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor="role">User Role</InputLabel>
            <Select
              id="role"
              name="role"
              value={loginRequest.role}
              onChange={handleUserInput}
            >
                <MenuItem value="">User Role</MenuItem> {/* Placeholder */}
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Customer">Customer</MenuItem>
              <MenuItem value="Seller">Seller</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="User Name"
            id="emailId"
            name="emailId"
            type="text"
            value={loginRequest.emailId}
            onChange={handleUserInput}
            fullWidth
            sx={{ mt: 2 }}
          />

          <TextField
            label="Password"
            id="password"
            name="password"
            type="password"
            value={loginRequest.password}
            onChange={handleUserInput}
            autoComplete="on"
            fullWidth
            sx={{ mt: 2 }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={loginAction}
            >
              Login Test
            </Button>
          </Box>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
          >
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </form>
      </Paper>
    </Container>
  );
};

export default UserLoginForm;
