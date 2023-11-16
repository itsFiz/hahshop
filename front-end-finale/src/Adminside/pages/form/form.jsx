import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Form = () => {
  let navigate = useNavigate();

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  const [registerRequest, setRegisterRequest] = useState({});

  const handleUserInput = (e) => {
    setRegisterRequest({ ...registerRequest, [e.target.name]: e.target.value });
  };

  const registerAdmin = (e) => {
    fetch("http://localhost:8080/api/user/admin/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + admin_jwtToken,
      },
      body: JSON.stringify(registerRequest),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          if (res.success) {
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
              navigate("/home");
            }, 1000);
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          } else {
            toast.error("It seems server is down", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
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

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box m="20px">
      <Header title="CREATE ADMIN" subtitle="Create a New Admin Profile" />
          <div className="container-fluid">
            <div className="card-body mt-3">
              <form>
                <div className="mb-3 text-color">
                  <label for="emailId">
                    <b>Email Id</b>
                  </label>
                  <TextField
                    type="email"
                    fullWidth
                    variant = "outlined"
              style={{backgroundColor: 'white'}}
                  
                    id="email"
                    name="emailId"
                    onChange={handleUserInput}
                    value={registerRequest.emailId}
                  />
                </div>
                <div className="mb-3 text-color">
                  <label for="password" >
                    <b>Password</b>
                  </label>
                  <TextField
                type={showPassword ? 'text' : 'password'}
                fullWidth
                variant = "outlined"
              style={{backgroundColor: 'white'}}
                id="password"
                name="password"
                onChange={handleUserInput}
                value={registerRequest.password}
                autoComplete="on"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleShowPassword}
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
                </div>
                <div className="d-flex aligns-items-center justify-content-center">
                  <button
                    type="submit"
                    className="btn bg-color custom-bg-text mb-2"
                    onClick={registerAdmin}
                  >
                    Register Admin
                  </button>
                </div>

                <ToastContainer />
              </form>
            </div>
          </div>
     
    
    
    </Box>
  );
};


const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),

});
const initialValues = {
  email: "",
  password: "",
};

export default Form;
