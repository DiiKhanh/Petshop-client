import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MyAccount from "./MyAccount";
import ChangePassword from "./ChangePassword";
import { useSelector } from "react-redux";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LockResetIcon from "@mui/icons-material/LockReset";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function ProfileView() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { user } = useSelector(state => state.user);


  return (
    <Box sx={{ width: "100%" }} bgcolor="background.paper">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Hồ Sơ Của Tôi" {...a11yProps(0)}
            icon={<PermIdentityIcon />} iconPosition="start"
          />
          <Tab label="Thay đổi mật khẩu" {...a11yProps(1)}
            icon={<LockResetIcon />} iconPosition="start"
          />
        </Tabs>
      </Box>
      <MyAccount value={value} index={0} user={user}/>

      <ChangePassword value={value} index={1} />
    </Box>
  );
}