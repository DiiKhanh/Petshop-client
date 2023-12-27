import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PetsIcon from "@mui/icons-material/Pets";

const main = [
  {
    display: "Trang chủ",
    path: "/",
    icon: <HomeOutlinedIcon />,
    state: "home"
  },
  {
    display: "Chó cảnh",
    path: "/dog",
    icon: <CategoryIcon />,
    state: "dog"
  },
  {
    display: "Đồ cho chó",
    path: "/product",
    icon: <NorthEastIcon />,
    state: "product"
  },
  {
    display: "Khuyến mãi",
    path: "/voucher",
    icon: <NorthEastIcon />,
    state: "voucher"
  },
  {
    display: "Liên hệ",
    path: "/contact",
    icon: <CategoryIcon />,
    state: "contact"
  }
];

const user = [
  {
    display: "Tài Khoản Của Tôi",
    path: "/profile",
    icon: <AccountBoxIcon />,
    state: "profile"
  },
  {
    display: "Lịch Sử Mua Hàng",
    path: "/purchased",
    icon: <ReceiptIcon />,
    state: "purchased"
  },
  {
    display: "Hồ sơ thú cưng",
    path: "/profile-pet",
    icon: <PetsIcon />,
    state: "Profile Pet"
  },
  // {
  //   display: "Đăng ký khám thú cưng",
  //   path: "/booking",
  //   icon: <BookOnlineIcon />,
  //   state: "booking"
  // },
  // {
  //   display: "password update",
  //   path: "/password-update",
  //   icon: <LockResetOutlinedIcon />,
  //   state: "password.update"
  // },
  {
    display: "Giỏ hàng",
    path: "/cart",
    icon: <ShoppingCartIcon />,
    state: "cart"
  }
];

const menuConfigs = { main, user };

export default menuConfigs;