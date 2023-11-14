import { Box, useTheme, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataSeller } from "../../data/mockData";
import Header from "../../components/Header";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";

const Allseller = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id",
      headerName: "ID",
      flex: 0.2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "firstname",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
    },
    {
        field: "lastname",
        headerName: "Last Name",
        flex: 1,
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
        flex: 1,
        renderCell: ({ row }) => (
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography>{row.status}</Typography>
            {row.status === "Active" && (
              <CheckCircleOutlineIcon color="success" sx={{ ml: 1 }} />
            )}
            {row.status === "Banned" && (
              <CancelIcon color="error" sx={{ ml: 1 }} />
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
            sx={{ marginLeft: 1 }}
          >
            Active
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleBan(row.id)} // Replace handleBan with your delete action
            sx={{ marginLeft: 1 }}
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
          rows={mockDataSeller}
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
