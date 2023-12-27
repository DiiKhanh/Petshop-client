import Box from "@mui/material/Box";
import { Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";

const AutoSwiper = ({ children }) => {
  return (
    <Box>
      <Swiper
        breakpoints={
          {
            640: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20
            }
          }
        }
        grabCursor={true}
        spaceBetween={20}
        style={{ width:"100%", height: "max-content" }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        modules={[Autoplay]}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default AutoSwiper;