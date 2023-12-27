import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import ListPurchased from "./ListPurchased";
import { useSelector } from "react-redux";
import { useState } from "react";
import ListWaitPayment from "./ListWaitPayment";
import ListWaitShip from "./ListWaitShip";
import ListSuccess from "./ListSuccess";


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const PurchasedView = () => {
  const { user } = useSelector(state => state.user);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack gap={2}>
      <Typography textTransform="uppercase" fontWeight={800} fontSize="1.2remx">
        Lịch sử mua hàng
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Tất cả" {...a11yProps(0)} />
          <Tab label="Chờ thanh toán" {...a11yProps(1)} />
          <Tab label="Chờ giao hàng" {...a11yProps(2)} />
          <Tab label="Hoàn thành" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <ListPurchased user={user} value={value} index={0}/>
      <ListWaitPayment user={user} value={value} index={1}/>
      <ListWaitShip user={user} value={value} index={2}/>
      <ListSuccess user={user} value={value} index={3}/>
    </Stack>
  );
};

export default PurchasedView;