import { Container } from "@mui/material";
import Helmet from "../components/Helmet";
import PurchasedView from "~/sections/purchased/PurchasedView";

const PurchasedPage = () => {
  return (
    <Helmet title="Purchased">
      <Container sx={{ marginY: "5rem" }}>
        <PurchasedView />
      </Container>
    </Helmet>
  );
};

export default PurchasedPage;