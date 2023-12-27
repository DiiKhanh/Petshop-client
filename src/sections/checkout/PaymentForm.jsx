import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Payment from "./Payment";
import { useState } from "react";
import Review from "./Review";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import checkoutApi from "~/apis/modules/checkout.api";
import { useSelector } from "react-redux";


export default function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { cartItems, totalAmount, shipInfo } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.user);
  const navigate = useNavigate();
  // goi api: checkout

  const payHandler = async () => {
    let dataCheckout = {
      user_id: user?.id,
      email: shipInfo?.email,
      address: `${shipInfo.address}, ${shipInfo.state}, ${shipInfo.city}`,
      total: totalAmount,
      payment: "chưa thanh toán",
      status: "Đang lấy hàng",
      data: cartItems,
      phoneNumber: shipInfo?.phone,
      name: shipInfo?.firstName
    };
    if (paymentMethod === "cod") {
      const { response, err } = await checkoutApi.checkoutCod(dataCheckout);
      if (err) {
        toast.error(err.message);
        return;
      }
      if (response.error) {
        toast.error(response.error);
        return;
      }
      if (response.status === 201) {
        toast.success("Đặt hàng thành công!");
        navigate(`/checkout/success`);
      }
      return;
    }

    if (paymentMethod === "online-payment-vnpay") {
      const { response, err } = await checkoutApi.vnpay({ total: totalAmount, data: cartItems });
      if (err) {
        toast.error(err.message || err);
        return null;
      }
      if (response.error) {
        toast.error(response.error);
        return null;
      }
      // // Chuyển hướng đến link
      window.location.href = response.data;
    }
  };

  const changePaymentMethodHandler = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Chọn hình thức thanh toán
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Payment method={paymentMethod} onChangeMethod={changePaymentMethodHandler} />
        </Grid>
        <Grid item xs={6}>
          <Review cartItems={cartItems} totalAmount={totalAmount} shipInfo={shipInfo} />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="primary" name="saveCard" value="yes" />}
            label="Ghi nhớ tài khoản thanh toán cho lần tiếp theo"
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" justifyContent="flex-end">
            <Button
              variant="contained"
              onClick={payHandler}
              sx={{ mt: 3, ml: 1 }}
            >
              Đặt hàng
            </Button>
          </Box>
        </Grid>

      </Grid>
    </>
  );
}