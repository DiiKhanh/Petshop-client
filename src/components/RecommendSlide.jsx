import { SwiperSlide } from "swiper/react";
import AutoSwiper from "./AutoSwiper";
import BredItem from "./BredItem";
import { bred } from "../assets/data";

const RecommendSlide = () => {
  return (
    <AutoSwiper>
      {bred["dogs"]?.map((item, index) => (
        <SwiperSlide key={index}>
          <BredItem item={item} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default RecommendSlide;