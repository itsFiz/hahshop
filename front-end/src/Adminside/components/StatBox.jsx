import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="30px 30px 40px 90px">
    <Box display="flex" alignItems="center" mt="20px 20px 20px 20px">
        <Typography variant="h5"  sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
      <Box display="flex" alignItems="center">
          {icon}
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ color: colors.grey[100] , marginLeft: 2}}
          >
            {title}
          </Typography>
        </Box>
        {/* <Box>
          <ProgressCircle progress={progress} />
        </Box> */}
      </Box>
      
    </Box>
  );
};

export default StatBox;
