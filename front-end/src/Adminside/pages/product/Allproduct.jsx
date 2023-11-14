import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataAllProducts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Allproduct = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    {
      field: "productimage",
      headerName: "Product",
      type: "text",
      headerAlign: "center",
      flex: 0.7,
      align: "center",
    },
    {
      field: "productname",
      headerName: "Product Name",
      flex: 0.7,
      headerAlign: "center",
      align: "center",
      cellClassName: "name-column--cell",
    },
    {
        field: "description",
        headerName: "Description",
        flex: 1,
        headerAlign: "center",
        align: "center",
        cellClassName: "name-column--cell",
      },
    
    {
      field: "category",
      headerName: "Category",
      headerAlign: "center",
      align: "center",
      flex: 0.6,
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
        field: "seller",
        headerName: "Seller",
        flex: 0.5,
        headerAlign: "center",
        align: "center",
      },
  ];

  return (
    <Box m="10px">
      <Header
        title="ALL PRODUCTS"
        subtitle="List of All Products for Admin Reference"
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
          rows={mockDataAllProducts}
          columns={columns}
          autoHeight={true}
          autoPageSize={false}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Allproduct;
