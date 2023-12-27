import { Link, Button, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "~/redux/features/cartSlice";
import { toast } from "react-toastify";
import emailApi from "~/apis/modules/email.api";
import checkoutApi from "~/apis/modules/checkout.api";

function VnpayView() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { shipInfo, totalAmount, cartItems } = useSelector(state => state.cart);
  useEffect(() => {
    let dataCheckout = {
      user_id: user?.id,
      email: shipInfo?.email,
      address: `${shipInfo.address}, ${shipInfo.state}, ${shipInfo.city}`,
      total: totalAmount,
      payment: "Đã thanh toán",
      status: "Đang lấy hàng",
      data: cartItems,
      phoneNumber: shipInfo?.phone,
      name: shipInfo?.firstName
    };
    const send = async () => {
      const data = {
        phone: shipInfo?.phone,
        address: `${shipInfo.address}, ${shipInfo.state}, ${shipInfo.city}`,
        total: totalAmount,
        email: shipInfo?.email,
        name: shipInfo?.firstName
      };
      try {
        await checkoutApi.checkoutCod(dataCheckout);
        const { response, err } = await emailApi.checkoutEmail(data);
        if (err) {
          toast.error(err);
          return;
        }
        if (response.status === 200) {
          toast.success(response.data);
          dispatch(clearCart());
          return;
        }
      } catch (error) {
        toast.error(error);
        return;
      }
    };
    send();
  }, []);

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <img src={`/assets/images/cod.svg`} alt="" width={120} height={120}/>
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ mb: "12px" }}>
            Cảm ơn Quý khách {shipInfo?.firstName} đã mua hàng trên PetShop! và thanh toán online
          </Typography>
          <Typography sx={{ width: { md: "85%", lg: "80%", xl: "65%" }, mx: "auto", mb: "12px", px: "12px" }}>
            Thời gian giao hàng dự kiến từ 2 - 5 ngày (có thể kéo dài hơn nếu bị ảnh hưởng bởi những tình huống bất khả
            kháng: thiên tai, bão lũ...). PetShop sẽ liên lạc với quý khách để xác nhận đơn và thông báo cụ thể.
          </Typography>
          <Typography>Rất mong quý khách hàng thông cảm!</Typography>
          <Typography sx={{ width: { md: "85%", lg: "80%", xl: "65%" }, mx: "auto", mb: "12px", px: "12px" }}>
            Để xem lại thông tin đơn hàng, quý khách vui lòng kiểm tra xác nhận đơn hàng đã được gửi qua email{" "}
            <strong>{shipInfo?.email}</strong>
          </Typography>
          <Typography sx={{ width: { md: "85%", lg: "80%", xl: "65%" }, mx: "auto", mb: "12px", px: "12px" }}>
            Trong trường hợp Quý khách không phải là Người trực tiếp nhận hàng. Quý khách vui lòng thông báo cho Người
            nhận luôn bật điện thoại để nhận liên lạc từ nhân viên giao hàng của PetShop
          </Typography>
          <Link href="/">
            <Button variant="contained">Trở về trang chủ</Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default VnpayView;