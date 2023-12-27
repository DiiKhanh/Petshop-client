import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Box, Stack, TextField, Button, Alert, FormGroup } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// import userApi from "../apis/modules/user.api";
import { setUser } from "../redux/features/userSlice";
import { setAuthModalOpen } from "../redux/features/authModalSlice";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "../configs/zod.config.js";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";

const SignupForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [success, setSucces] = useState(false);

  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit,
    control,
    reset
  } = useForm({ resolver: zodResolver(SignUpSchema) });

  const onHandleSubmit = async (data) => {
    console.log(data);
    setErrorMessage(undefined);
    setIsLoginRequest(true);
    setSucces(true);
    // const { response, err } = await userApi.signup(data);
    setIsLoginRequest(false);
    const err = {
      message: "Error"
    };
    // if (response) {
    //   reset();
    //   dispatch(setUser(response));
    //   dispatch(setAuthModalOpen(false));
    //   toast.success("Sign up success");
    // }

    if (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onHandleSubmit)}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <TextField
            {
              ...register("first_name")
            }
            type="text"
            label="Họ"
            name="first_name"
            fullWidth
            sx={{
              width:"40%"
            }}
            error={touchedFields && errors?.first_name?.message !== undefined}
            helperText={touchedFields && errors?.first_name?.message}
          />
          <TextField
            {
              ...register("last_name")
            }
            type="text"
            label="Tên"
            name="last_name"
            fullWidth
            sx={{
              width:"50%"
            }}
            error={touchedFields && errors?.last_name?.message !== undefined}
            helperText={touchedFields && errors?.last_name?.message}
          />
        </Stack>
        <TextField
          {
            ...register("username")
          }
          type="text"
          label="Username"
          name="username"
          fullWidth
          error={touchedFields && errors?.username?.message !== undefined}
          helperText={touchedFields && errors?.username?.message}
        />
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
          error={touchedFields && errors?.password?.message !== undefined}
          helperText={touchedFields && errors?.password?.message}
        />
        <TextField
          {
            ...register("confirmPassword")
          }
          type="password"
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          fullWidth
          error={touchedFields && errors?.confirmPassword?.message !== undefined}
          helperText={touchedFields && errors?.confirmPassword?.message}
        />
        <TextField
          {
            ...register("phone")
          }
          type="text"
          label="Số điện thoại"
          name="phone"
          fullWidth
          error={touchedFields && errors?.phone?.message !== undefined}
          helperText={touchedFields && errors?.phone?.message}
        />

        {
          !success && <FormGroup>
            <FormControlLabel
              control={
                <Controller
                  name="terms"
                  control={control}
                  render={({ field }) => <Checkbox {...field} />}
                />
              }
              label="Đồng ý điều khoản & điều kiện"
            />
            {errors?.terms && (
              <FormHelperText error>{errors?.terms?.message}</FormHelperText>
            )}
          </FormGroup>
        }
        {
          success && <TextField
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
        }
      </Stack>
      {
        !success && <LoadingButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          sx={{ marginTop: 4 }}
          loading={isLoginRequest}
        >
      Đăng ký
        </LoadingButton>
      }


      {
        !success && <Button
          fullWidth
          sx={{ marginTop: 1 }}
          onClick={() => switchAuthState()}
        >
      Đăng nhập
        </Button>

      }
      {
        success && <LoadingButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          sx={{ marginTop: 4 }}
          loading={isLoginRequest}
          onClick={() => switchAuthState()}
        >
          Xác nhận
        </LoadingButton>
      }
      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined" >{errorMessage}</Alert>
        </Box>
      )}
    </Box>
  );
};

export default SignupForm;