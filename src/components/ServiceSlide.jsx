import { SwiperSlide } from "swiper/react";
import AutoSwiper from "./AutoSwiper";
import BredItem from "./BredItem";

const services = [
  {
    name: "Dịch vụ khám thú cưng",
    image: "https://petnow.com.vn/wp-content/uploads/2023/08/331302687_602956375009074_5900577847245008220_n.png",
    short_des: "Dịch vụ đăng ký khám sức khỏe cho thú cưng của bạn"
  }
];

const ServiceSlide = () => {
  return (
    <AutoSwiper>
      {
        services?.map((item, idx) => (
          <SwiperSlide key={idx}>
            <BredItem item={item} />
          </SwiperSlide>
        ))
      }
    </AutoSwiper>
  );
};

export default ServiceSlide;