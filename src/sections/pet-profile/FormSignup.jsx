import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Alert, ImageList, ImageListItem, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import { toast } from "react-toastify";
import bookingApi from "~/apis/modules/booking.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingSchema } from "~/configs/zod.config";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "1200px",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 12,
  p: 2
};

export default function FormSignup({ open, handleClose, item }) {
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [hours, setHours] = useState();
  const [date, setDate] = useState();
  const { user } = useSelector(state => state.user);

  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit,
    reset
  } = useForm({ resolver: zodResolver(BookingSchema) });


  const onHandleSubmit = async (data) => {
    setErrorMessage(undefined);
    setIsLoginRequest(true);
    const { response, err } = await bookingApi.create({ ...data, hour: hours, date, dog_item_id: item.id, user_id:user.id });
    setIsLoginRequest(false);
    if (response) {
      reset();
      toast.success("Đăng ký dịch vụ thành công! Đợi xác nhận");
      handleClose();
      window.location.reload();
    }
    if (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Đăng ký dịch vụ khám cho thú cưng
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Trung tâm điều trị bệnh thú cưng Petshop rất hân hạnh đón tiếp quý khách hàng tới thăm khám và điều trị cho thú cưng, Quý khách có thể đặt lịch khám trực tiếp qua điện thoại với số hotline: 012345678 hoặc đặt lịch khám online trên website.
          </Typography>
          <Typography variant="h6" component="h3" color="primary.price">
            Đặt lịch trước để chúng tôi phục vụ tốt hơn
          </Typography>
          <Typography component="p" mb={2}>
            Vui lòng nhập đầy đủ thông tin, nhân viên của chúng tôi sẽ điện lại tư vấn
          </Typography>
          <Box display="flex" alignItems="start" flexDirection="column" gap={1}>
            <Typography fontSize="24px" fontWeight="bold">Thông tin thú cưng đăng ký</Typography>
            <Typography fontSize="18px">Tên: {item?.name} - ID: {item?.id}</Typography>
            <Typography>Hình ảnh</Typography>
            <ImageList sx={{ width: "100%", height: "120px" }} cols={3} rowHeight={164}>
              {item?.images.map((item) => (
                <ImageListItem key={item}>
                  <img
                    alt={item}
                    src={item}
                    loading="lazy"
                    height="100px"
                    style={{ objectFit:"cover" }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
          <Box component="form" onSubmit={handleSubmit(onHandleSubmit)} >
            <Stack spacing={3}>
              <TextField
                {
                  ...register("user_name")
                }
                type="text"
                label="Tên khách hàng"
                name="user_name"
                fullWidth
                error={touchedFields && errors?.user_name?.message !== undefined}
                helperText={touchedFields && errors?.user_name?.message}
              />
              <Box display="flex" alignItems="center" gap={2}>
                <TextField
                  {
                    ...register("phone_number")
                  }
                  type="text"
                  sx={{ flex:1 }}
                  label="Số điện thoại"
                  name="phone_number"
                  error={touchedFields && errors?.phone_number?.message !== undefined}
                  helperText={touchedFields && errors?.phone_number?.message}
                />
                <TextField
                  {
                    ...register("service")
                  }
                  sx={{ flex:2 }}
                  type="text"
                  label="Dịch vụ"
                  name="service"
                  error={touchedFields && errors?.service?.message !== undefined}
                  helperText={touchedFields && errors?.service?.message}
                />
              </Box>
              <TextField
                {
                  ...register("description")
                }
                type="text"
                label="Mô tả tình trạng thú cưng"
                name="description"
                multiline
                maxRows={3}
                fullWidth
                error={touchedFields && errors?.description?.message !== undefined}
                helperText={touchedFields && errors?.description?.message}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box display="flex" alignItems="center" gap={2}>
                  <DatePicker
                    onChange={(newValue) => setDate(newValue.format("MM DD YYYY"))}
                  />
                  <TimePicker
                    // value={hours}
                    onChange={(e) => setHours(e.format("HH:mm"))}
                  />
                </Box>
              </LocalizationProvider>
            </Stack>
            <LoadingButton
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ marginTop: 2 }}
              loading={isLoginRequest}
            >
              Xác nhận đăng ký
            </LoadingButton>
            {errorMessage && (
              <Box sx={{ marginTop: 2 }}>
                <Alert severity="error" variant="outlined" >{errorMessage}</Alert>
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}