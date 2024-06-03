import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "../components/Logo";
import PetsIcon from "@mui/icons-material/Pets";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import { Link as LinkRoute, useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import { FormGroup } from "@mui/material";
import userApi from "../apis/modules/user.api";
import { SignUpSchema } from "../configs/zod.config.js";
import FormHelperText from "@mui/material/FormHelperText";
import { toast } from "react-toastify";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:5173/">
        PetShop
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignupPage() {
  const navigate = useNavigate();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit,
    control
  } = useForm({ resolver: zodResolver(SignUpSchema) });

  const onHandleSubmit = async (data) => {
    const handleData = {
      username: data.username,
      email: data.email,
      password: data.password,
      phoneNumber: data.phone,
      firstName: data.first_name,
      lastName: data.last_name
    };
    setErrorMessage(undefined);
    setIsLoginRequest(true);
    const { response, err } = await userApi.signup(handleData);
    setIsLoginRequest(false);
    if (response) {
      toast.success("Đăng ký tài khoản thành công mời bạn xác nhận!");
    }
    if (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box sx={{ position:"absolute", right:"80px", top:"50px" }}>
          <Box sx={{ cursor:"pointer" }}>
            <LinkRoute style={{ color:"inherit" }} to="/">
              <CloseIcon />
            </LinkRoute>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Box sx={{ alignItems:"center", justifyContent:"center", marginBottom: "2rem" }} display="flex" columnGap={1}>
            <Logo/> <PetsIcon/>
          </Box>
          <Typography component="h1" variant="h5" fontWeight="bold" marginBottom={3}>
            ĐĂNG KÝ
          </Typography>
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

              <FormGroup>
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

            </Stack>
            <LoadingButton
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ marginTop: 4 }}
              loading={isLoginRequest}
            >
                Đăng ký
            </LoadingButton>
            <Button
              fullWidth
              sx={{ marginTop: 1 }}
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </Button>
            {errorMessage && (
              <Box sx={{ marginTop: 2 }}>
                <Alert severity="error" variant="outlined" >{errorMessage}</Alert>
              </Box>
            )}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}