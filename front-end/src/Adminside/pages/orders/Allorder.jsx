import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataAllOrders } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";

const Allorders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    { field: "orderId", headerName: "Order ID" },
    {
      field: "productname",
      headerName: "Product Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
      cellClassName: "name-column--cell",
    },
    {
      field: "productimage",
      headerName: "Product",
      type: "text",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category",
      headerName: "Category",
      headerAlign: "center",
      align: "center",
      flex: 1.5,
    },
    {
      field: "seller",
      headerName: "Seller",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quantity",
      headerName: "Qty",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 0.3,
    },
    {
      field: "ordertime",
      headerName: "Order Time",
      headerAlign: "center",
      align: "center",
      flex: 1,
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
          {row.status === "Completed" && (
            <CheckCircleOutlineIcon color="success" sx={{ ml: 1 }} />
          )}
          {row.status === "Pending" && (
            <HourglassEmptyIcon color="warning" sx={{ ml: 1 }} />
          )}
          {row.status === "Cancelled" && (
            <CancelIcon color="error" sx={{ ml: 1 }} />
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box m="10px">
      <Header
        title="ALL ORDERS"
        subtitle="List of All Orders for Admin Reference"
      />
      <Box
        m="0px 0 0 0"
        height="75vh"
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
          rows={mockDataAllOrders}
          columns={columns}
          autoHeight={true}
          autoPageSize={false}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Allorders;
