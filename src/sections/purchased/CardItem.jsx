import Divider from "@mui/material/Divider";
import { Box, Button, ButtonGroup, List, ListItemAvatar, Stack, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { valueLabelFormat } from "~/utils/formatter";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setModalContact } from "~/redux/features/globalLoadingSlice";

const CardItem = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <Stack marginY={1} bgcolor="#fff">
        <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
          <Typography>Mã hóa đơn: {item?.id}</Typography>

          <Box display="flex">
            <LocalShippingIcon />
            {
              item?.payment === "Đã thanh toán" && <Typography marginX="4px" color="green">Đơn hàng đã được thanh toán online</Typography>
            }
            <Divider orientation="vertical" flexItem sx={{ marginX:1 }}/>
            <Typography textTransform="uppercase" fontWeight="bold" color="primary.price">
              {item?.status}
            </Typography>
          </Box>
        </Box>
        <Divider orientation="horizontal" />
        <List>
          {
            item?.data.map(item =>
              <ListItem sx={{ gap:2 }} key={item.name}>
                <ListItemAvatar>
                  <img src={item?.images[0]} alt="img-order"
                    height="100px" width="100px" style={{ objectFit:"cover" }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item?.name}
                />
                <Typography variant="subtitle1">
                  {item?.quantity} x {" "}
                  {valueLabelFormat(item?.price)}
                </Typography>
              </ListItem>
            )
          }
        </List>

        <Divider orientation="horizontal" />
        <Box display="flex" alignItems="end" p={2} flexDirection="column" gap={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography>Thành tiền:</Typography>
            <Typography component="p" color="primary.price" fontWeight="bold">
              {valueLabelFormat(item?.total)}
            </Typography>
          </Box>
          <ButtonGroup sx={{ marginY: 1, gap:2 }}>
            <Button variant="contained" onClick={() => navigate(`${item.id}`)}>Xem chi tiết</Button>
            <Button variant="outlined" sx={{ color:"#333" }}
              onClick={() => dispatch(setModalContact(true))}
            >Liên hệ người bán</Button>
          </ButtonGroup>
        </Box>
      </Stack>
    </>
  );
};

export default CardItem;