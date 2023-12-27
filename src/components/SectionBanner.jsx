import { Box, Typography, useTheme } from "@mui/material";
import uiConfigs from "../configs/ui.config.js";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import LinkBread from "@mui/material/Link";

const SectionBanner = ({ title }) => {
  const theme = useTheme();

  return (
    <Box sx={{
      position: "relative",
      color: "primary.contrastText",
      "&::before": {
        content: "''",
        width: "100%",
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 2,
        pointerEvents: "none",
        ...uiConfigs.style.gradientBgImage[theme.palette.mode]
      }
    }}>
      <Box sx={{
        paddingTop: {
          xs: "60%",
          sm: "40%",
          md: "30%",
          lg: "20%"
        },
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat:"no-repeat",
        backgroundImage: "url(https://petnow.com.vn/wp-content/uploads/2023/08/bg-featured-title.jpg)"
      }} />
      <Box sx={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0
      }} />
      <Box sx={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        display:"flex",
        justifyContent:"center"
      }}>
        <Box sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection:"column",
          paddingX: "30px",
          color: "text.primary",
          justifyContent:"center",
          width:"100%"
        }}>

          {/* title */}
          <Box>
            <Typography
              variant="h4"
              fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
              fontWeight="700"
              color="#fff"
              sx={{
                ...uiConfigs.style.typoLines(2, "left")
              }}
            >
              PetShop
            </Typography>
          </Box>

          <Box marginTop={2} marginRight={2}>
            <Breadcrumbs aria-label="breadcrumb">
              <LinkBread underline="hover" to="/" component={Link} color="#fff">
                  Trang chủ
              </LinkBread>
              <LinkBread
                underline="hover"
                color="primary"
              >
                { title }
              </LinkBread>
            </Breadcrumbs>
          </Box>
          {/* title */}
        </Box>
      </Box>
    </Box>
  );
};

export default SectionBanner;