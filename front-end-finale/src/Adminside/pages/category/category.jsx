import { Box, useTheme, Button } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { tokens } from "../../../theme";
import { mockDataCategory } from "../../data/mockData";
import Header from "../../components/Header";
import { TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import CategoryForm from "./addcategory";



const Category = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [allCategories, setAllCategories] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  let navigate = useNavigate();

  useEffect(() => {
    const getAllCategory = async () => {
      const allCategories = await retrieveAllCategory();
      if (allCategories) {
        setAllCategories(allCategories.categories);
      }
    };

    getAllCategory();
  }, []);

  const retrieveAllCategory = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/category/fetch/all"
    );
    console.log(response.data);
    return response.data;
  };

  const deleteCategory = (categoryId, e) => {
    fetch(
      "http://localhost:8080/api/category/delete?categoryId=" + categoryId,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + admin_jwtToken,
        },
      }
    )
      .then((result) => {
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
              //   navigate("/category");
              window.location.reload(true);
            }, 2000); // Redirect after 3 seconds
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
        setTimeout(() => {
          window.location.reload(true);
        }, 1000); // Redirect after 3 seconds
      });
  };

  const updateCategory = (category) => {
    navigate("/editcategory", { state: category });
  };

  const saveCategory = (e) => {
    let data = { name, description };

    fetch("http://localhost:8080/api/category/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + admin_jwtToken,
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
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
              //   navigate("/category");
              window.location.reload(true);
            }, 2000); // Redirect after 3 seconds
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
            }, 2000); // Redirect after 3 seconds
          } else {
            toast.error("It Seems Server is down!!!", {
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
            }, 2000); // Redirect after 3 seconds
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
        setTimeout(() => {
          window.location.reload(true);
        }, 1000); // Redirect after 3 seconds
      });
    e.preventDefault();
  };

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  

  // GET ORDER FROM API
  const DataAllCategories = allCategories.map((category) => ({
    id: category.id,
    categoryname: category.name,
    description: category.description,
  }));
  // GET ORDER FROM API END
  const columns = [
    { field: "id",
      headerName: "ID",
      flex: 0.2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "categoryname",
      headerName: "Category",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3,
      headerAlign: "center",
      align: "left",
    },

    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center" alignItems="center">
          {/* <Button
            variant="contained"
            color="secondary"
            onClick={() => updateCategory(row.id)} // Replace handleEdit with your edit action
          >
            Edit
          </Button> */}
          <Button
            variant="contained"
            color="error"
            // onClick={() => handleDelete(row.id)} // Replace handleDelete with your delete action
            onClick={() => deleteCategory(row.id)}
            sx={{ marginLeft: 1 }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const handleEdit = (id) => {
    // Implement your edit logic here
    console.log(`Edit item with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Implement your delete logic here
    console.log(`Delete item with ID: ${id}`);
  };


  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Box m="0 20px 20px 20px">
      <Header title="CATEGORY" subtitle="Managing the Product Category" />
        {/* FORM TO ADD CATEGORY */}
      <CategoryForm/>
      {/* <Box>
      <div className="card-body text-color mt-3">
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              <b>Category Title</b>
            </label>
            <TextField
              fullWidth
              id="title"
              variant="outlined"
              placeholder="Enter category.."
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
          </div>

          
          <Box mt={2} />

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              <b>Category Description</b>
            </label>
            <TextField
              fullWidth
              id="description"
              variant="outlined"
              placeholder="Enter description.."
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
            />
          </div>

          
          <Box mt={2} />

          <div className="d-flex aligns-items-center justify-content-center mb-2">
            <Button
              type="submit"
              onClick={saveCategory}
              variant="contained"
              color="secondary"
            >
              Add Category
            </Button>
          </div>

          <ToastContainer />
        </form>
      </div>
    </Box>  */}
  
      {/* TABLE TO DISPLAY CATEGORY */}
      <Box
        m="0 0 0 0"
        height="59vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            color: colors.grey[100],
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={DataAllCategories}
          columns={columns}
          autoHeight={false}
          autoPageSize={true}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  category: yup.string().required("required"),
  description: yup.string().required("required"),
});
const initialValues = {
  category: "",
  description: "",
};

export default Category;
