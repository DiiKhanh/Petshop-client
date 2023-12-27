import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Box, Button, Chip, Divider, Stack, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import uiConfigs from "../configs/ui.config.js";
import CircularRate from "./CircularRate";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const rate = [
  {
    info: "Dịch vụ"
  },
  {
    info: "Chất lượng"
  },
  {
    info: "Đảm bảo"
  }
];

const links = [
  {
    img: "https://i.imgur.com/hDBgTXS.png"
  },
  {
    img:"https://i.imgur.com/fiTeJPv.png"
  }
];

const HeroSlide = () => {
  const theme = useTheme();

  return (
    <Box sx={{
      position: "relative",
      color: "primary.contrastText",
      "&::before": {
        content: "''",
        width: "100%",
        height: "30%",
        position: "absolute",
        bottom: 0,
        left: 0,
        zIndex: 2,
        pointerEvents: "none",
        ...uiConfigs.style.gradientBgImage[theme.palette.mode]
      }
    }}>
      <Swiper
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        style={{ width: "100%", height: "max-content" }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false
        }}
      >
        {
          links?.map((i, idx) => (
            <SwiperSlide key={idx}>
              <Box sx={{
                paddingTop: {
                  xs: "80%",
                  sm: "55%",
                  md: "50%",
                  lg: "40%"
                },
                backgroundPosition: "top",
                backgroundSize: "cover",
                backgroundImage: `url(${i.img})`
              }} />
              <Box sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                ...uiConfigs.style.horizontalGradientBgImage[theme.palette.mode]
              }} />
              <Box sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                paddingX: { sm: "10px", md: "5rem", lg: "10rem" }
              }}>
                <Box sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  paddingX: "30px",
                  color: "text.primary",
                  width: { sm: "unset", md: "30%", lg: "40%" }
                }}>
                  <Stack spacing={4} direction="column">
                    {/* title */}
                    <Typography
                      variant="h4"
                      fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                      fontWeight="700"
                      sx={{
                        ...uiConfigs.style.typoLines(2, "left")
                      }}
                    >
            PetShop
                    </Typography>
                    {/* title */}

                    <Stack direction="row" spacing={1} alignItems="center">
                      {/* rating */}
                      <CircularRate />
                      {/* rating */}

                      <Divider orientation="vertical" />
                      {/* genres */}
                      {
                        rate?.map((i, idx) => (
                          <Chip
                            variant='filled'
                            color='primary'
                            key={idx}
                            label={i.info}
                          />
                        ))
                      }
                      {/* genres */}
                    </Stack>

                    {/* overview */}
                    <Typography variant="body1" sx={{
                      ...uiConfigs.style.typoLines(3)
                    }}>
              Trang web chia sẻ về kinh nghiệm chăm sóc, huấn luyện chó mèo và giới thiệu các sản phẩm dịch vụ dành cho thú cưng.
                    </Typography>
                    {/* overview */}

                    {/* buttons */}
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        size="large"
                        component={Link}
                        to={"/dog"}
                        startIcon={<PlayArrowIcon />}
                        sx={{ width: "max-content" }}
                      >
              Chó cảnh
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        component={Link}
                        to={"/cat"}
                        startIcon={<PlayArrowIcon />}
                        sx={{ width: "max-content" }}
                      >
              Mèo cảnh
                      </Button>
                    </Stack>
                    {/* buttons */}
                  </Stack>
                </Box>
              </Box>
            </SwiperSlide>
          ))
        }

      </Swiper>

    </Box>
  );
};

export default HeroSlide;