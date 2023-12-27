import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShippingSchema } from "~/configs/zod.config.js";
import { useDispatch, useSelector } from "react-redux";
import { createShipInfo } from "~/redux/features/cartSlice.js";
import { toast } from "react-toastify";

export default function AddressForm() {
  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit
  } = useForm({ resolver: zodResolver(ShippingSchema) });

  const dispatch = useDispatch();
  const { shipInfo } = useSelector(state => state.cart);

  const onHandleSubmit = async (data) => {
    toast.success("Đã lưu thông tin địa chỉ!");
    dispatch(createShipInfo(data));
  };
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Địa chỉ giao hàng
      </Typography>
      <Grid container spacing={3} component="form" onSubmit={handleSubmit(onHandleSubmit)}>
        <Grid item xs={12} sm={6}>
          <TextField
            {
              ...register("firstName")
            }
            type="text"
            label="Họ tên người nhận"
            name="firstName"
            fullWidth
            error={touchedFields && errors?.firstName?.message !== undefined}
            helperText={touchedFields && errors?.firstName?.message}
            autoComplete="given-fullname"
            variant="standard"
            defaultValue={shipInfo?.firstName || ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {
              ...register("phone")
            }
            type="text"
            label="Số điện thoại người nhận"
            name="phone"
            fullWidth
            error={touchedFields && errors?.phone?.message !== undefined}
            helperText={touchedFields && errors?.phone?.message}
            variant="standard"
            defaultValue={shipInfo?.phone || ""}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            {
              ...register("email")
            }
            type="text"
            label="Email"
            name="email"
            fullWidth
            error={touchedFields && errors?.email?.message !== undefined}
            helperText={touchedFields && errors?.email?.message}
            variant="standard"
            defaultValue={shipInfo?.email || ""}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            {
              ...register("address")
            }
            type="text"
            label="Địa chỉ người nhận"
            name="address"
            fullWidth
            variant="standard"
            error={touchedFields && errors?.address?.message !== undefined}
            helperText={touchedFields && errors?.address?.message}
            defaultValue={shipInfo?.address || ""}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            {
              ...register("city")
            }
            name="city"
            label="Tỉnh / Thành phố"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            error={touchedFields && errors?.city?.message !== undefined}
            helperText={touchedFields && errors?.city?.message}
            defaultValue={shipInfo?.city || ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {
              ...register("state")
            }
            label="Huyện / Quận"
            fullWidth
            autoComplete="shipping state"
            variant="standard"
            name="state"
            error={touchedFields && errors?.state?.message !== undefined}
            helperText={touchedFields && errors?.state?.message}
            defaultValue={shipInfo?.state || ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {
              ...register("zip")
            }
            name="zip"
            label="Mã bưu điện"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            error={touchedFields && errors?.zip?.message !== undefined}
            helperText={touchedFields && errors?.zip?.message}
            defaultValue={shipInfo?.zip || ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {
              ...register("country")
            }
            name="country"
            label="Quốc gia"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            error={touchedFields && errors?.country?.message !== undefined}
            helperText={touchedFields && errors?.country?.message}
            defaultValue={shipInfo?.country || ""}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="primary" name="saveAddress"
              defaultChecked={shipInfo ? true : false}
            />}
            label="Sử dụng địa chỉ này cho thanh toán"
          />

        </Grid>
        <Button
          type="submit"
          sx={{ mt: 1, ml: 3 }} variant="contained">
              Xác nhận
        </Button>
      </Grid>
    </>
  );
}