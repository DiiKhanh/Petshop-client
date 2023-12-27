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
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { setUser } from "../redux/features/userSlice";
import { toast } from "react-toastify";
import { SignInSchema } from "../configs/zod.config.js";
import userApi from "../apis/modules/user.api";
import CloseIcon from "@mui/icons-material/Close";
import { Link as LinkRoute, useNavigate } from "react-router-dom";

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

export default function LoginPage() {
  const dispatch = useDispatch();
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

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
      reset();
      toast.success("Đăng nhập thành công");
      navigate("/");
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
            ĐĂNG NHẬP
          </Typography>
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
              <FormControlLabel
                sx={{ marginY:"5px!important", padding:"0px!important" }}
                control={<Checkbox value="remember" color="primary" />}
                label="Ghi nhớ tôi"
              />
            </Stack>
            <LoadingButton
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ marginTop: 2 }}
              loading={isLoginRequest}
            >
              Đăng nhập
            </LoadingButton>
            <Button
              fullWidth
              sx={{ marginTop: 1 }}
              onClick={() => navigate("/signup")}
            >
              Đăng ký
            </Button>
            <Button
              fullWidth
              sx={{ marginTop: 1 }}
              onClick={() => navigate("/reset-password")}
            >
              Quên mật khẩu
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