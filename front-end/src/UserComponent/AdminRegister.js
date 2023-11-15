import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Snackbar,
  Alert,
  Typography,
  Box,
} from '@mui/material';

const AdminRegister = () => {
  const navigate = useNavigate();
  const admin_jwtToken = sessionStorage.getItem('admin-jwtToken');

  const [registerRequest, setRegisterRequest] = useState({});

  const handleUserInput = (e) => {
    setRegisterRequest({ ...registerRequest, [e.target.name]: e.target.value });
  };

  const registerAdmin = (e) => {
    e.preventDefault();
    // Fetch request and other logic remains the same
  };

  const handleSnackbar = (message, severity) => {
    // Snackbar handling logic remains the same
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card raised sx={{ p: 3 }}>
        <CardHeader
          title={
            <Typography variant="h5" component="div" align="center">
              Admin Register
            </Typography>
          }
          sx={{ pb: 2 }}
        />
        <CardContent>
          <form onSubmit={registerAdmin}>
            <Box mb={3}>
              <TextField
                type="email"
                label="Email Id"
                variant="outlined"
                fullWidth
                name="emailId"
                onChange={handleUserInput}
                value={registerRequest.emailId || ''}
              />
            </Box>
            <Box mb={3}>
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                onChange={handleUserInput}
                value={registerRequest.password || ''}
                autoComplete="on"
              />
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminRegister;
