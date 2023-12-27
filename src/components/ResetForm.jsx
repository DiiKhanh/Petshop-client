import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack, TextField, Button, Alert, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { setUser } from "../redux/features/userSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { toast } from "react-toastify";
import { ResetPasswordSchema } from "../configs/zod.config.js";

const ResetForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [success, setSucces] = useState(false);

  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit,
    reset
  } = useForm({ resolver: zodResolver(ResetPasswordSchema) });


  const onHandleSubmit = async (data) => {
    setErrorMessage(undefined);
    setIsLoginRequest(true);
    // const { response, err } = await userApi.signin(data);
    setIsLoginRequest(false);
    // if (response) {
    //   reset();
    //   dispatch(setUser(response));
    //   dispatch(setAuthModalOpen(false));
    //   toast.success("Đăng nhập thành công");
    // }
    const err = {
      message: "Error"
    };
    if (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onHandleSubmit)}>
      <Stack spacing={3}>
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
        />
        {
          !success && <LoadingButton
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            sx={{ marginTop: 4 }}
            loading={isLoginRequest}
            onClick={() => setSucces(true)}
          >
          Gửi Email xác nhận
          </LoadingButton>
        }
        {
          success && <>
            <Typography>Đã gửi mã xác nhận qua email, vui lòng kiểm tra!</Typography>
            <TextField
              {
                ...register("token")
              }
              type="text"
              label="Token xác nhận"
              name="token"
              fullWidth
              autoComplete="current-password"
              error={touchedFields && errors?.token?.message !== undefined}
              helperText={touchedFields && errors?.token?.message}
            />
            <TextField
              {
                ...register("newPassword")
              }
              type="password"
              label="Mật khẩu"
              name="newPassword"
              fullWidth
              error={touchedFields && errors?.newPassword?.message !== undefined}
              helperText={touchedFields && errors?.newPassword?.message}
            />
            <TextField
              {
                ...register("confirmNewPassword")
              }
              type="password"
              label="Xác nhận mật khẩu"
              name="confirmNewPassword"
              fullWidth
              error={touchedFields && errors?.confirmNewPassword?.message !== undefined}
              helperText={touchedFields && errors?.confirmNewPassword?.message}
            />
          </>
        }

      </Stack>
      {
        success && <LoadingButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          sx={{ marginTop: 4 }}
          loading={isLoginRequest}
        >
      Xác nhận
        </LoadingButton>
      }

      <Button
        fullWidth
        sx={{ marginTop: 1 }}
        onClick={() => switchAuthState()}
      >
        Đăng nhập
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined" >{errorMessage}</Alert>
        </Box>
      )}
    </Box>
  );
};

export default ResetForm;