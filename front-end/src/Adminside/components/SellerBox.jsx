import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import axios from "axios";
// import ProgressCircle from "./ProgressCircle";

const SellerBox = ({ subtitle, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [allSeller, setAllSeller] = useState([]);
  const [totalSeller, setTotalSeller] = useState(0);
  const admin_jwtToken = sessionStorage.getItem('admin-jwtToken')

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveAllUser()
      if (allUsers) {
        setAllSeller(allUsers.users)
      }
    }

    getAllUsers()
  }, [])

  useEffect(() => {
    const getTotalSeller = async() => {
    // count total sellers
    const totalSellers = allSeller.length;
    setTotalSeller(totalSellers);

    };
    getTotalSeller();
  },[allSeller]);

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
            {totalSeller} Sellers
          </Typography>
        </Box>
        {/* <Box>
          <ProgressCircle progress={progress} />
        </Box> */}
      </Box>
    </Box>
  );
};

export default SellerBox;
