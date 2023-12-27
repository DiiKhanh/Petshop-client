import Box from "@mui/material/Box";
import { Navigation, Pagination, Grid } from "swiper/modules";
import { Swiper } from "swiper/react";

const NavigationSwiper = ({ children }) => {
  return (
    <Box sx={{
      "& .swiper-slide-active": { opacity: 1 },
      "& .swiper-pagination-bullet": {
        backgroundColor: "primary.main"
      },
      "& .swiper-button-next, & .swiper-button-prev": {
        color: "primary.main"
      }
    }}>
      <Swiper
        grabCursor={true}
        breakpoints={
          {
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
              grid: {
                rows: 1
              }
            },
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
              grid: {
                rows: 1
              }
            },
            576: {
              slidesPerView: 3,
              spaceBetween: 10,
              grid: {
                rows: 1
              }
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
              grid: {
                rows: 2,
                fill: "row"
              }
            },
            1024: {
              slidesPerView: 4,
              grid: {
                rows: 2,
                fill: "row"
              }
            }
          }
        }
        spaceBetween={20}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Grid, Navigation, Pagination]}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default NavigationSwiper;