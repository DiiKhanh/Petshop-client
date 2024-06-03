import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "../components/Logo";
import PetsIcon from "@mui/icons-material/Pets";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { VerifyToken } from "~/configs/zod.config.js";
import userApi from "../apis/modules/user.api";
import CloseIcon from "@mui/icons-material/Close";
import { Link as LinkRoute, useNavigate } from "react-router-dom";
import { ZodError } from "zod";
import OTPInput from "react-otp-input";

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

export default function VerifyPage() {
  const [otp, setOtp] = useState("");
  const [isVerify, setIsVerify] = useState(false);
  const navigate = useNavigate();

  const handlePaste= (event) => {
    event.clipboardData.getData("text");
  };


  const handleVerify = async () => {
    setIsVerify(true);
    try {
      VerifyToken.parse({ token: otp });
    } catch (error) {
      if (error instanceof ZodError) {
        setIsVerify(false);
        toast.error(error.issues[0].message);
        return;
      }
    }
    const { response, err } = await userApi.verify(otp);
    setIsVerify(false);
    if (response) {
      toast.success("Xác nhận thành công! Vui lòng đăng nhập");
      navigate("/login");
    }
    if (err) {
      toast.error(err.message);
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
            XÁC NHẬN TÀI KHOẢN
          </Typography>
          <Box>
            <Stack gap={3}>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={8}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                onPaste={handlePaste}
                shouldAutoFocus
                containerStyle={{
                  gap: "10px"
                }}
                inputStyle={{
                  width: "3rem",
                  height: "3rem",
                  fontSize: "2rem",
                  borderRadius: "4px",
                  border: "1px solid rgba(0, 0, 0, .3)"
                }}
              />
              <Box sx={{ justifyContent:"space-between", display:"flex", alignItems:"center" }}>
                <Button variant="outlined" color="error"
                  onClick={() => setOtp("")}
                >Xóa tất cả</Button>
                <LoadingButton type="submit" variant="contained" onClick={handleVerify}
                  loading={isVerify}
                >
        Xác nhận mã
                </LoadingButton>
              </Box>
            </Stack>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}