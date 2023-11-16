import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Allproduct = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await retrieveAllProducts();
      if (allProducts) {
        setAllProducts(allProducts.products);
      }
    };

    getAllProducts();
  }, []);

  const retrieveAllProducts = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/product/fetch/all"
    );
    console.log(response.data);
    return response.data;
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "productimage",
      headerName: "Product",
      headerAlign: "center",
      align: "center",
      flex: 0.5,
      renderCell: ({ row }) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          {row.productimage && (
            <img
              src={row.productimage}
              alt="Product"
              style={{ maxHeight: "100%", width: "auto", objectFit: "contain" }}
            />
          )}
        </Box>
      ),
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
      flex: 0.2,
    },
    {
      field: "seller",
      headerName: "Seller",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
  ];

  // const DataAllProducts = [
  //   {
  //     id: 1,
  //     productimage: "iphone.jpeg",
  //     productname: "Iphone 15 Pro Max",
  //     description: "This is Iphone 15 Pro",
  //     category: "Electronic & Gadgets",
  //     quantity: 1,
  //     price: "RM" + 4900.00,
  //     seller: "Apple",
  //   }
  // ]

  // GET ORDER FROM API
  const DataAllProducts = allProducts.map((product) => ({
    id: product.id,
    productimage: "http://localhost:8080/api/product/" + product.image1,
    productname: product.name,
    description: product.description,
    category: product.category.name,
    price: "RM" + product.price,
    quantity: product.quantity,
    seller: product.seller.firstName,
  }));

  // GET ORDER FROM API END

  return (
    <Box m="10px">
      <Header
        title="ALL PRODUCTS"
        subtitle="List of All Products for Admin Reference"
      />
      <Box
        m="10px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.blueAccent[700],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[100],
            borderBottom: "none",
            maxHeight: "168px !important"
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.blueAccent[100],
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
          rows={DataAllProducts}
          rowHeight={80}
          columns={columns}
          autoHeight={true}
          autoPageSize={false}
          density="comfortable"
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Allproduct;
