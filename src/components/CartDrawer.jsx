import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import ListCartDrawer from "./ListCartDrawer";
import { useSelector } from "react-redux";

const CartDrawer = ({ toggleDrawer, state }) => {
  const { cartItems } = useSelector((state) => state.cart);

  const list = (anchor) => (
    <Box
      sx={{ width: 400 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box position="absolute" top="0" right="0" sx={{ cursor:"pointer" }}>
        <Tooltip title="Đóng"
          onClick={toggleDrawer(anchor, false)}
        >
          <CloseIcon fontSize="large" />
        </Tooltip>
      </Box>
      <Stack alignItems="center" spacing={2} marginTop={2}>
        <Typography fontWeight="bold" fontSize="20px" textTransform="uppercase">Giỏ hàng</Typography>
        {cartItems?.length > 0 ? <ListCartDrawer toggleDrawer={toggleDrawer(anchor, false)}
          cartItems={cartItems}
        /> : <Typography>Chưa có sản phẩm trong giỏ hàng</Typography>}
      </Stack>
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor={"right"}
      open={state["right"]}
      onClose={toggleDrawer("right", false)}
      onOpen={toggleDrawer("right", true)}
    >
      {list("right")}
    </SwipeableDrawer>
  );
};

export default CartDrawer;