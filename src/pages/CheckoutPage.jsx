import Helmet from "../components/Helmet";
import { Container } from "@mui/material";
import PaymentView from "~/sections/payment/PaymentView";

const CheckoutPage = () => {
  return (
    <Helmet title="Thanh toán">
      <Container sx={{ marginTop:"200px" }}>
        <PaymentView />
      </Container>
    </Helmet>
  );
};

export default CheckoutPage;