import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { valueLabelFormat } from "../../utils/formatter.js";
import { useSelector } from "react-redux";

const ListOrder = () => {
  const { cartItems, totalAmount } = useSelector(state => state.cart);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Danh sách sản phẩm
      </Typography>
      <List disablePadding>
        {cartItems.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={`${product.name} x ${product.quantity}`}
              secondary={
                <img src={product.images[0]} alt="img-order"
                  height="150px" width="150px" style={{ objectFit:"cover" }}
                />
              }
            />
            <Typography variant="subtitle1">
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: "text.disabled",
                  textDecoration: "line-through"
                }}
              >
                {product.PriceSale && (valueLabelFormat(product.price))}
              </Typography>
      &nbsp;
              {product.priceSale ? (valueLabelFormat(product.PriceSale)) : (valueLabelFormat(product.price))}
            </Typography>
          </ListItem>
        ))}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Tổng thanh toán" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {valueLabelFormat(totalAmount)}
          </Typography>
        </ListItem>
      </List>
    </>
  );
};

export default ListOrder;