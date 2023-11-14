import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";

function LoginPage() {
  let navigate = useNavigate();

  const [loginRequest, setLoginRequest] = useState({
    emailId: "",
    password: "",
    role: "",
  });

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
              toast.success(res.responseMessage, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setTimeout(() => {
                window.location.href = "/home";
              }, 1000); // Redirect after 3 seconds
            } else {
              toast.error(res.responseMessage, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
          } else {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    e.preventDefault();
  };

  return (
    <Container>
      <Box
        mt={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Paper elevation={3} style={{ width: "25rem" }}>
          <Box p={3}>
            <Typography variant="h5" align="center">
              User Login
            </Typography>
            <form>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel htmlFor="role">User Role</InputLabel>
                <Select
                  onChange={handleUserInput}
                  name="role"
                  value={loginRequest.role}
                >
                  <MenuItem value="0">Select Role</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Customer">Customer</MenuItem>
                  <MenuItem value="Seller">Seller</MenuItem>
                  <MenuItem value="Delivery">Delivery Person</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Email Id"
                id="emailId"
                name="emailId"
                onChange={handleUserInput}
                value={loginRequest.emailId}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                type="password"
                label="Password"
                id="password"
                name="password"
                onChange={handleUserInput}
                value={loginRequest.password}
                autoComplete="on"
                sx={{ mb: 2 }}
              />

              <Box display="flex" justifyContent="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={loginAction}
                >
                  Login
                </Button>
              </Box>
            </form>
            <ToastContainer />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default LoginPage;
