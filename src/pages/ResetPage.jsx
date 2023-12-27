import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "../components/Logo";
import PetsIcon from "@mui/icons-material/Pets";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import userApi from "../apis/modules/user.api";
import CloseIcon from "@mui/icons-material/Close";
import { Link as LinkRoute, useNavigate } from "react-router-dom";
import { ResetPasswordSchema } from "../configs/zod.config.js";

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

export default function ResetPage() {
  const navigate = useNavigate();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [success, setSucces] = useState(false);

  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit
  } = useForm({ resolver: zodResolver(ResetPasswordSchema) });

  const emailForm = useForm({
    defaultValues: {
      email: ""
    }
  });


  const onHandleSubmit = async (data) => {
    setErrorMessage(undefined);
    setIsLoginRequest(true);
    const { response, err } = await userApi.forgotPassword(data);
    setIsLoginRequest(false);
    if (response) {
      setSucces(true);
      toast.success("Đã gửi mã xác nhận về email!");
    }
    if (err) {
      setErrorMessage(err.message);
    }
  };

  const onHandleSubmitToken = async (data) => {
    setErrorMessage(undefined);
    setIsLoginRequest(true);
    const { response, err } = await userApi.resetPassword(data);
    setIsLoginRequest(false);
    if (response) {
      toast.success("Đã reset mật khẩu thành công, mời đăng nhập!");
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
            QUÊN MẬT KHẨU
          </Typography>
          <Box component="form" onSubmit={emailForm.handleSubmit(onHandleSubmit)}>
            <Stack spacing={3}>
              <TextField
                {
                  ...emailForm.register("email", {
                    required:true
                  })
                }
                type="email"
                label="Email"
                name="email"
                fullWidth
                sx={{ width:"400px" }}
                error={emailForm?.formState?.touchedFields && emailForm?.formState?.errors?.email?.message !== undefined}
                helperText={emailForm?.formState?.touchedFields && emailForm?.formState?.errors?.email?.message}
              />

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
                Gửi Email xác nhận
              </LoadingButton>
            }

            {errorMessage && (
              <Box sx={{ marginTop: 2 }}>
                <Alert severity="error" variant="outlined" >{errorMessage}</Alert>
              </Box>
            )}
          </Box>

          {
            success && <Box component="form" onSubmit={handleSubmit(onHandleSubmitToken)}>
              <Stack spacing={3}>
                <Typography>Đã gửi mã xác nhận qua email, vui lòng kiểm tra!</Typography>
                <TextField
                  {
                    ...register("token")
                  }
                  type="text"
                  label="Token xác nhận"
                  name="token"
                  fullWidth
                  sx={{ width:"400px" }}
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
              </Stack>

              <LoadingButton
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                sx={{ marginTop: 4 }}
                loading={isLoginRequest}
              >
                  Xác nhận
              </LoadingButton>

              {errorMessage && (
                <Box sx={{ marginTop: 2 }}>
                  <Alert severity="error" variant="outlined" >{errorMessage}</Alert>
                </Box>
              )}
            </Box>
          }
          <Button
            fullWidth
            sx={{ marginTop: 1 }}
            onClick={() => navigate("/login")}
          >
          Đăng nhập
          </Button>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}