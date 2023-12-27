import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Zoom } from "swiper/modules";
import Box from "@mui/material/Box";

const ThumbsGallery = ({ image }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Box
      sx={{
        "& .swiper-slide":{
          backgroundPosition:"center",
          backgroundSize:"cover",
          overflow:"hidden"
        },
        "& .swiper-slide-active": { opacity: 1 }
      }}
    >
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff"
        }}
        // grabCursor={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs, Zoom]}
        zoom={true}
      >
        {
          image?.map((i, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-zoom-container">
                <img src={i}
                  style={{ width:"100%",
                    // aspectRatio:"auto 680 / 453",
                    aspectRatio:"1/0.9",
                    verticalAlign:"middle", borderRadius:"5px", objectFit:"cover" }}
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <Box sx={{
        "& .swiper-slide-thumb-active":{
          opacity:"1 !important"
        }
      }}>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView="auto"
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {
            image?.map((i, index) => (
              <SwiperSlide key={index} style={{
                padding:"10px 0",
                opacity: 0.4,
                width:"25%"
              }}>
                <img src={i}
                  style={{ width:"100%",
                    // aspectRatio:"auto 680 / 453",
                    aspectRatio:"1/0.85",
                    verticalAlign:"middle", borderRadius:"5px", objectFit:"cover" }}
                  loading="lazy"
                />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </Box>
    </Box>
  );
};

export default ThumbsGallery;
