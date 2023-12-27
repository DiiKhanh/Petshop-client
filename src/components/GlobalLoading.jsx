import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import LinearProgress from "@mui/material/LinearProgress";
import Logo from "./Logo";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PetsIcon from "@mui/icons-material/Pets";
import { Stack } from "@mui/material";


const GlobalLoading = () => {
  const { globalLoading } = useSelector((state) => state.globalLoading);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true);
    } else {
      setTimeout(() => setIsLoading(false), 2000);
    }
  }, [globalLoading]);

  return (
    <React.Fragment>
      <Paper sx={{
        pointerEvents: "none",
        zIndex: 999,
        width: "100vw",
        height: "100vh",
        position: "fixed",
        transition: "all 0.3s ease",
        opacity: isLoading ? 1 : 0
      }}>
        <Toolbar/>
        <LinearProgress />
        <Stack sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
        direction="row" spacing={1} alignItems="center"
        >
          <Logo /> <PetsIcon fontSize="large"/>
        </Stack>
      </Paper>
    </React.Fragment>
  );
};

export default GlobalLoading;