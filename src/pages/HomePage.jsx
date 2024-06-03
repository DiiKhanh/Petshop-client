import ContainerBox from "../components/ContainerBox";
import BredSlide from "../components/BredSlide";
import Helmet from "../components/Helmet";
import HeroSlide from "../components/HeroSlide";
import ProductGridSlide from "../components/ProductGridSlide";
import Benefit from "../components/Benefit";
import ServiceSlide from "../components/ServiceSlide";

const HomePage = () => {
  return (
    <Helmet title="Trang chủ">
      <HeroSlide />
      <ContainerBox title="Giống chó cảnh">
        <BredSlide category="dogs"/>
      </ContainerBox>
      <ContainerBox title="Giống mèo cảnh">
        <BredSlide category="cats"/>
      </ContainerBox>
      <ContainerBox title="Sản phẩm thú cưng">
        <ProductGridSlide />
      </ContainerBox>
      <ContainerBox title="Quyền lợi">
        <Benefit />
      </ContainerBox>
      <ContainerBox title="Dịch vụ thú cưng">
        <ServiceSlide />
      </ContainerBox>
    </Helmet>
  );
};

export default HomePage;