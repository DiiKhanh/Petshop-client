import { SwiperSlide } from "swiper/react";
import AutoSwiper from "./AutoSwiper";
import { bred } from "../assets/data";
import BredItem from "./BredItem";

const BredSlide = ({ category }) => {

  return (
    <AutoSwiper>
      {bred[`${category}`]?.map((item, index) => (
        <SwiperSlide key={index}>
          <BredItem item={item} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default BredSlide;