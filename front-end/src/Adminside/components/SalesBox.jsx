import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import axios from "axios";
// import ProgressCircle from "./ProgressCircle";

const SalesBox = ({ subtitle, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [sales, setSales] = useState(0);
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/order/fetch/all",
          {
            headers: {
              Authorization: "Bearer " + admin_jwtToken,
            },
          }
        );

        const allOrders = response.data.orders || [];
        setSales(
          allOrders.reduce((acc, order) => {
            const orderAmount = order.product.price * order.quantity;
            return acc + orderAmount;
          }, 0)
        );
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, [admin_jwtToken]);


  return (
    <Box width="100%" m="30px 30px 40px 50px">
      <Box display="flex" alignItems="center" mt="20px 20px 20px 20px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        ></Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          {icon}
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{ color: colors.grey[100], marginLeft: 2 }}
          >
            RM {sales}
          </Typography>
        </Box>
        {/* <Box>
          <ProgressCircle progress={progress} />
        </Box> */}
      </Box>
    </Box>
  );
};

export default SalesBox;
