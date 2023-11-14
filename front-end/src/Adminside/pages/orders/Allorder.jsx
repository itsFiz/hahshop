import { useState, useEffect } from "react";
import axios from "axios";
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

  // BACKEND CONFIGURATION START
  const [orders, setOrders] = useState([]);

  const [orderId, setOrderId] = useState("");
  const [tempOrderId, setTempOrderId] = useState("");
  // to calculat total sales
  const [sales, setSales] = useState(0);
  // to calculate total product
  const [products, setProducts] = useState(0);

  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  useEffect(() => {
    // Calculate and set the accumulated sales amount
    const totalSales = orders.reduce((acc, order) => {
      const orderAmount = order.product.price * order.quantity;
      return acc + orderAmount;
    }, 0);

    setSales(totalSales);
  }, [orders]);

  useEffect(() => {
    const getAllProducts = async () => {
    // Calculate and set the accumulated sales amount
    const totalProducts = orders.reduce((acc, order) => {
      const productAmount = order.quantity;
      return acc + productAmount;
    }, 0);

    setProducts(totalProducts);
    };
    getAllProducts();
  }, [orders]);

  useEffect(() => {
    const getAllOrders = async () => {
      let allOrders;
      if (orderId) {
        allOrders = await retrieveOrdersById();
      } else {
        allOrders = await retrieveAllorders();
      }

      if (allOrders) {
        setOrders(allOrders.orders);
      }
    };

    getAllOrders();
  }, [orderId]);

  const retrieveAllorders = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/order/fetch/all",
      {
        headers: {
          Authorization: "Bearer " + admin_jwtToken, // Replace with your actual JWT token
        },
      }
    );
    console.log(response.data);
    return response.data;
  };

  const retrieveOrdersById = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/order/fetch?orderId=" + orderId
    );
    console.log(response.data);
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };


  // BACKEND CONFIGURATION END

  const columns = [
    // { field: "id", headerName: "ID", flex: 0.2 },
    {
      field: "orderId",
      headerName: "Order ID",
      flex: 1.1,
      headerAlign: "center",
      align: "center",
      cellClassName: "name-column--cell",
    },
    {
      field: "productname",
      headerName: "Product Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "productimage",
    //   headerName: "Product",
    //   type: "image",
    //   headerAlign: "center",
    //   align: "center",
    // },
    {
      field: "productimage",
      headerName: "Product",
      headerAlign: "center",
      align: "center",
      flex: 1,
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
      field: "category",
      headerName: "Category",
      headerAlign: "center",
      align: "center",
      flex: 1,
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
      flex: 0.7,
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

  // GET ORDER FROM API
  const DataAllOrders = orders.map((order) => ({
    id: order.orderId,
    orderId: order.orderId,
    productname: order.product.name,
    productimage: "http://localhost:8080/api/product/" + order.product.image1,
    category: order.product.category.name,
    seller: order.product.seller.firstName,
    price: "RM" + order.product.price,
    quantity: order.quantity,
    ordertime: formatDateFromEpoch(order.orderTime),
    status: order.status,
  }));

  // GET ORDER FROM API END

  return (
    <Box m="10px">
      <Header
        title="ALL ORDERS"
        subtitle="List of All Orders for Admin Reference"
      />
      <p>Total Sales: RM {sales}</p>
      <p>Total Product: {products}</p>
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
          rows={DataAllOrders}
          rowHeight={100}
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
