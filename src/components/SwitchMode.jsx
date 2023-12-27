import { IconButton } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { themeModes } from "../configs/theme.config.js";
import React from "react";

const SwitchMode = () => {
  const { mode, setMode } = useColorScheme();
  const onSwithTheme = () => {
    setMode(mode === themeModes.dark ? themeModes.light : themeModes.dark);
  };
  return (
    <React.Fragment>
      <IconButton sx={{ color: "inherit" }} onClick={onSwithTheme}>
        {mode === themeModes.dark && <DarkModeOutlinedIcon />}
        {mode === themeModes.light && <WbSunnyOutlinedIcon />}
      </IconButton>
    </React.Fragment>
  );
};

export default SwitchMode;