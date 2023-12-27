import { LoadingButton } from "@mui/lab";
import { Box, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangePasswordSchema } from "~/configs/zod.config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import userApi from "~/apis/modules/user.api";
import { clearUser } from "~/redux/features/userSlice";
import { createShipInfo } from "~/redux/features/cartSlice";


const ChangePassword = (props) => {
  const { value, index, ...other } = props;
  const [onRequest, setOnRequest] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit, reset
  } = useForm({ resolver: zodResolver(ChangePasswordSchema) });

  const onHandleSubmit = async (data) => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, err } = await userApi.changePassword({ currentPassword: data.currentPassword, newPassword: data.newPassword, confirmNewPassword:data.confirmNewPassword });

    setOnRequest(false);
    if (err) toast.error(err.message);
    if (response.error) {
      reset();
      toast.error("Mật khẩu cũ sai!");
    }
    if (response.message) {
      reset();
      toast.success("Đã thay đổi mật khẩu");
      dispatch(clearUser());
      dispatch(createShipInfo(null));
      navigate("/login");
    }
  };
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box component='form' maxWidth='400px' mt={5}
        onSubmit={handleSubmit(onHandleSubmit)}
      >
        <Stack spacing={2}>
          <TextField
            {
              ...register("currentPassword")
            }
            type='password'
            placeholder='Mật khẩu cũ'
            name='currentPassword'
            fullWidth
            color='success'
            error={touchedFields && errors?.currentPassword?.message !== undefined}
            helperText={touchedFields && errors?.currentPassword?.message}
          />
          <TextField
            {
              ...register("newPassword")
            }
            type='password'
            placeholder='Mật khẩu mới'
            name='newPassword'
            fullWidth
            color='success'
            error={touchedFields && errors?.newPassword?.message !== undefined}
            helperText={touchedFields && errors?.newPassword?.message}
          />
          <TextField
            {
              ...register("confirmNewPassword")
            }
            type='password'
            placeholder='Nhập lại mật khẩu mới'
            name='confirmNewPassword'
            fullWidth
            color='success'
            error={touchedFields && errors?.confirmNewPassword?.message !== undefined}
            helperText={touchedFields && errors?.confirmNewPassword?.message}
          />

          <LoadingButton
            type='submit'
            variant='contained'
            fullWidth
            sx={{ marginTop: 4 }}
            loading={onRequest}
          >
              Thay đổi mật khẩu
          </LoadingButton>
        </Stack>
      </Box>
    </div>
  );
};

export default ChangePassword;