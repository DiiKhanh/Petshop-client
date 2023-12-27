import CssBaseline from "@mui/material/CssBaseline";

//import MainLayout from "./layouts/MainLayout";
//import PageWrapper from "./components/PageWrapper";
//import routes from "./routes/routes";
import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import Router from "./routes/sections";
import useScrollToTop from "./hooks/useScrollToTop";

const App = () => {
  useScrollToTop();

  return (
    <React.Fragment>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      <CssBaseline/>
      <Router />
    </React.Fragment>
  );
};

export default App;