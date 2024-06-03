import { SwiperSlide } from "swiper/react";
import AutoSwiper from "./AutoSwiper";
import { bred } from "../assets/data";
import BredItem from "./BredItem";

const BredSlide = ({ category }) => {
  let type;
  type = category === "dogs" ? "dog" : "cat";
  return (
    <AutoSwiper>
      {bred[`${category}`]?.map((item, index) => (
        <SwiperSlide key={index}>
          <BredItem item={item} type={type}/>
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default BredSlide;