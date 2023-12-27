import { Container } from "@mui/material";
import Helmet from "../components/Helmet";
import CheckoutView from "../sections/checkout/CheckoutView";

const OrderPage = () => {
  return (
    <Helmet title="Order">
      <Container sx={{ marginTop:"100px" }}>
        <CheckoutView />
      </Container>
    </Helmet>
  );
};

export default OrderPage;