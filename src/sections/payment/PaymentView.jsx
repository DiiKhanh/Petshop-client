import Container from "@mui/material/Container";
import { useLocation, useSearchParams } from "react-router-dom";
import FailedPage from "./FailedPage";
import SuccessPage from "./SuccessPage";
import VnpayView from "./VnpayView";


function PaymentView() {
  const location = useLocation();
  const [searchParams]= useSearchParams();
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
  return (
    <Container maxWidth={false} sx={{ marginY: "100px" }}>
      {
        location?.search !== "" && vnp_ResponseCode !== "00" ?
          <FailedPage /> : vnp_ResponseCode === "00" ? <VnpayView /> : <SuccessPage />
      }
    </Container>
  );
}

export default PaymentView;