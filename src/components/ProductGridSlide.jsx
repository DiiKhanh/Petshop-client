import { SwiperSlide } from "swiper/react";
import NavigationSwiper from "./NavigationSwiper";
import { products } from "../assets/data";
import BredItem from "./BredItem";

const ComicGrid = () => {
  return (
    <NavigationSwiper>
      {products?.map((item, index) => (
        <SwiperSlide key={index}>
          <BredItem item={item} />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default ComicGrid;
