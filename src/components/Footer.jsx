import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        p: 6
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Về chúng tôi
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Nơi giúp bạn có nhiều thông tin bổ ích trong việc chọn, nuôi chó mèo, chăm sóc thú cưng tại gia đình.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Liên hệ
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Khu phố 6 P, Thủ Đức, Thành phố Hồ Chí Minh
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: petshop@gmail.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Điện thoại: +84 234 567 8901
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Theo dõi chúng tôi
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
            Các giống chó mèo cảnh phổ biến
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Chó Poodle, chó Phốc sóc, chó Corgi
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Chó Alaska, chó Samoyed, chó Husky
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Mèo Anh lông ngắn, mèo tai cụp, mèo Munchkin
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="http://localhost:5173/">
              PetShop
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}