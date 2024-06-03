import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { valueLabelFormat } from "../utils/formatter";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/features/cartSlice";
import { toast } from "react-toastify";
import { setModalContact } from "~/redux/features/globalLoadingSlice";

const AnimalItem = ({ item }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { cartItems } = useSelector(state => state.cart);
  function findProductByIdAndType(productsArray, id, type) {
    return productsArray.find(product => product.id === +id && product.type === type);
  }

  const addToCart = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Bạn phải đăng nhập để thực hiện chức năng này!");
    }
    else {
      const exist = findProductByIdAndType(cartItems, item.dogItemId, "animal");
      if (exist) {
        toast.error("Sản phẩm đã có trong giỏ hàng");
        return;
      }
      dispatch(addItem({
        id: item?.dogItemId,
        quantity: 1,
        price: item?.price,
        images: item?.images,
        dogName: item?.dogName,
        type: "animal"
      }));
      toast.success("Thêm vào giỏ hàng thành công!");
    }

  };

  return (
    <Box >
      <Card sx={{ maxWidth: 320, cursor: "pointer" }}
      >
        <CardMedia
          image={item?.images[0]}
          title={item?.dogName}
          sx={{
            height: "320px",
            width:"100%",
            objectFit:"cover"
          }}
        />
        <CardContent component={Link} to={`${item?.dogItemId}`} sx={{ textDecoration:"none", color:"inherit" }}>
          <Typography gutterBottom variant="h6" component="div" textTransform="capitalize"
            textAlign="center"
            fontWeight="bold"
            fontSize="16px"
            sx={{
              overflow:"hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: "1"
            }}
          >
            {item?.dogName} {item?.dogItemId}
          </Typography>
          <Typography gutterBottom variant="h6" color="primary.price"
            textAlign="center"
          >
            {valueLabelFormat(item?.price)}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent:"center" }}>
          {
            item?.isInStock ? <Button
              variant="contained"
              size="medium"
              onClick={addToCart}
            >
                Thêm vào giỏ hàng
            </Button> : <Button variant="contained"
              size="medium"
              onClick={() => dispatch(setModalContact(true))}
            >
                Liên hệ
            </Button>
          }
        </CardActions>
      </Card>
    </Box>
  );
};

export default AnimalItem;