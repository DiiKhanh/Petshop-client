import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { valueLabelFormat } from "../utils/formatter";
import CloseIcon from "@mui/icons-material/Close";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { deleteItem } from "../redux/features/cartSlice";
import { useNavigate } from "react-router-dom";

const ListCartDrawer = ({ toggleDrawer, cartItems }) => {
  const { totalAmount } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Stack>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {
          cartItems?.map((item) => (
            <React.Fragment key={item.type+item.id}>
              <ListItem alignItems="flex-start" sx={{ gap:"10px" }}>
                <Box>
                  <img src={item.images[0]} width="80px" height="80px" loading="lazy" style={{
                    objectFit:"cover"
                  }}/>
                </Box>
                <ListItemText
                  primary={item.name}
                  secondary={
                    <React.Fragment>
                      {item.quantity}x
                      <Typography
                        sx={{ display: "inline", fontSize:"16px" }}
                        component="span"
                        variant="body2"
                        color="primary.price"
                      >
                        {
                          valueLabelFormat(item.price)
                        }
                      </Typography>
                    </React.Fragment>
                  }
                />
                <Box onClick={() => dispatch(deleteItem({ id:item.id, type: item.type }))}>
                  <Tooltip title="Xóa">
                    <CloseIcon fontSize="medium"/>
                  </Tooltip>
                </Box>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))
        }

      </List>
      <Box marginY={3}>
        Tổng: <Typography component="span" color="primary.price">{valueLabelFormat(totalAmount)}</Typography>
      </Box>
      <Stack spacing={2}>
        <Button variant="contained" color="secondary" onClick={() => {
          navigate("cart");
          toggleDrawer();
        }}>
          Xem giỏ hàng
        </Button>
        <Button variant="contained"
          onClick={() => {
            navigate("order");
            toggleDrawer();
          }}
        >
          Thanh toán
        </Button>
      </Stack>
    </Stack>
  );
};

export default ListCartDrawer;