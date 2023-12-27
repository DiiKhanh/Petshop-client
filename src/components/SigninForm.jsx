import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack, TextField, Button, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { setUser } from "../redux/features/userSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { toast } from "react-toastify";
import { SignInSchema } from "../configs/zod.config.js";
import userApi from "../apis/modules/user.api";

const SigninForm = ({ switchAuthStateSignup, switchAuthStateReset }) => {
  const dispatch = useDispatch();
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit,
    reset
  } = useForm({ resolver: zodResolver(SignInSchema) });


  const onHandleSubmit = async (data) => {
    setErrorMessage(undefined);
    setIsLoginRequest(true);
    const { response, err } = await userApi.signin(data);
    setIsLoginRequest(false);
    if (response) {
      dispatch(setUser(response));
      dispatch(setAuthModalOpen(false));
      reset();
      toast.success("Đăng nhập thành công");
    }
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
        <TextField
          {
            ...register("password")
          }
          type="password"
          label="Mật khẩu"
          name="password"
          fullWidth
          autoComplete="current-password"
          error={touchedFields && errors?.password?.message !== undefined}
          helperText={touchedFields && errors?.password?.message}
        />
      </Stack>
      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        Đăng nhập
      </LoadingButton>

      <Button
        fullWidth
        sx={{ marginTop: 1 }}
        onClick={() => switchAuthStateSignup()}
      >
        Đăng ký
      </Button>
      <Button
        fullWidth
        sx={{ marginTop: 1 }}
        onClick={() => switchAuthStateReset()}
      >
        Quên mật khẩu
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined" >{errorMessage}</Alert>
        </Box>
      )}
    </Box>
  );
};

export default SigninForm;