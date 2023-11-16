import { Box, useTheme, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataSeller } from "../../data/mockData";
import Header from "../../components/Header";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState, useEffect } from 'react'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Allseller = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [allSeller, setAllSeller] = useState([]);

  const admin_jwtToken = sessionStorage.getItem('admin-jwtToken')

  let navigate = useNavigate()

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser()
      if (allUsers) {
        setAllSeller(allUsers.users)
      }
    }

    getAllUsers()
  }, [])



  const retrieveAllUser = async () => {
    const response = await axios.get(
      'http://localhost:8080/api/user/fetch/role-wise?role=Seller',
      {
        headers: {
          Authorization: 'Bearer ' + admin_jwtToken, // Replace with your actual JWT token
        },
      }
    )
    console.log(response.data)
    return response.data
  }

  const deleteSeller = (userId, e) => {
    fetch('http://localhost:8080/api/user/delete/seller?sellerId=' + userId, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + admin_jwtToken,
      },
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: 'top-center',
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })

            setTimeout(() => {
              window.location.reload(true)
            }, 1000) // Redirect after 3 seconds
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: 'top-center',
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
            setTimeout(() => {
              window.location.reload(true)
            }, 1000) // Redirect after 3 seconds
          }
        })
      })
      .catch((error) => {
        console.error(error)
        toast.error('It seems server is down', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setTimeout(() => {
          window.location.reload(true)
        }, 1000) // Redirect after 3 seconds
      })
  }

  const columns = [
    // { field: "id",
    //   headerName: "ID",
    //   flex: 0.2,
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "firstname",
      headerName: "First Name",
      flex: 0.7,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
    },
    {
        field: "lastname",
        headerName: "Last Name",
        flex: 0.7,
        cellClassName: "name-column--cell",
        headerAlign: "center",
        align: "center",
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
        cellClassName: "name-column--cell",
        headerAlign: "center",
        align: "center",
      },
      {
        field: "phone",
        headerName: "Phone Number",
        flex: 0.6,
        cellClassName: "name-column--cell",
        headerAlign: "center",
        align: "center",
      },
      {
        field: "address",
        headerName: "Address",
        flex: 1,
        cellClassName: "name-column--cell",
        headerAlign: "center",
        align: "center",
      },
      {
        field: "status",
        headerName: "Status",
        headerAlign: "center",
        align: "center",
        flex: 0.5,
        renderCell: ({ row }) => (
          <Box display="flex" alignItems="center" justifyContent="center">
           <Typography sx={{ fontSize: 12, color: row.status === "Active" ? 'green' : 'red' }}> {row.status}</Typography>
            {row.status === "Active" && (
              <CheckCircleOutlineIcon color="success" sx={{ ml: 1 }} />
            )}
            {row.status === "Deactivated" && (
              <CancelIcon color="error" sx={{ ml: 1,  }} />
            )}
          </Box>
        ),
      },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            color="success"
            onClick={() => handleBan(row.id)} // Replace handleBan with your delete action
            sx={{ marginLeft: 1, fontSize: 12, padding: '8px 8px' }}
          >
            Active
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteSeller(row.id)}
            sx={{ marginLeft: 1, fontSize: 12, padding: '8px 8px' }}
          >
            Ban
          </Button>
        </Box>
        
      ),
    },
  ];


  const handleBan = (id) => {
    // Implement your delete logic here
    console.log(`Delete item with ID: ${id}`);
  };

  const DataAllSellers = allSeller.map((seller) => ({
    id: seller.id,
    firstname: seller.firstName,
    lastname: seller.lastName,
    email: seller.emailId,
    phone: seller.phoneNo,
    address: seller.address.street,
    status: seller.status,
  }));


  return (
    <Box m="0 20px 20px 20px">
      <Header title="SELLER" subtitle="Managing All Sellers" />

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
          rows={DataAllSellers}
          columns={columns}
          autoHeight={false}
          autoPageSize={true}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};



export default Allseller;
