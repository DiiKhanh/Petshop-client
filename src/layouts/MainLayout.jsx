import React from "react";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import GlobalLoading from "../components/GlobalLoading";
import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import ChatBotPage from "../pages/ChatBotPage";
import ModalContact from "~/components/ModalContact";

const MainLayout = () => {

  return (
    <React.Fragment>
      {/* loading */}
      <GlobalLoading />

      <ModalContact />
      {/* view  */}
      <Box display="flex" minHeight="100vh">
        {/* Header */}
        <TopBar />
        {/* Header */}
        {/* main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet/>
        </Box>
        {/* main */}
      </Box>
      {/* view  */}
      <ChatBotPage />
      {/* Footer */}
      <Footer />
      {/* Footer */}
    </React.Fragment>
  );
};

export default MainLayout;