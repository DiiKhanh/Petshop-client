import { SwiperSlide } from "swiper/react";
import AutoSwiper from "./AutoSwiper";
import BredItem from "./BredItem";
import { bred } from "../assets/data";

const RecommendSlide = ({ type }) => {
  return (
    <AutoSwiper>
      {bred[`${type}s`]?.map((item, index) => (
        <SwiperSlide key={index}>
          <BredItem item={item} type={type}/>
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default RecommendSlide;