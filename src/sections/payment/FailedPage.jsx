import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function FailedPage() {
  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <img src={`/assets/images/cod.svg`} alt="" width={120} height={120}/>
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ mb: "12px" }}>
            ĐƠN HÀNG ĐÃ BỊ HỦY DO GIAO DỊCH THẤT BẠI!
          </Typography>
          <Box sx={{ textAlign: "center", px: "12px" }}>
            <Typography>Đơn hàng đã bị hủy vì quý khách đã hủy giao dịch</Typography>
            <Typography>Quý khách vui lòng thực hiện lại mua hàng và thanh toán</Typography>
            <Typography>Chân thành cảm ơn quý khách đã tin tưởng TuliBear</Typography>
            <Link to="/order">
              <Button variant="contained" sx={{ marginTop:"20px" }}>Thanh toán lại</Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default FailedPage;