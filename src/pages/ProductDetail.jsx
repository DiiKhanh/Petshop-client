import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet";
import { useCallback, useEffect, useState } from "react";
import SectionBanner from "../components/SectionBanner";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ThumbsGallery from "../components/ThumbsGallery";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { valueLabelFormat } from "../utils/formatter";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Review from "../components/Review";
import HeaderContainer from "../components/HeaderContainer";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import RecommendSlide from "../components/RecommendSlide";
import itemApi from "../apis/modules/item.api";
import { toast } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";
import Label from "../components/Label";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import QuantityInput from "~/components/quantity/QuantityInput";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "~/redux/features/cartSlice";
import { setModalContact } from "~/redux/features/globalLoadingSlice";
import commentApi from "~/apis/modules/comment.api";


const ProductDetail = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const { user } = useSelector(state => state.user);
  const { cartItems } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const getDogDetail = useCallback(async () => {
    setIsLoading(true);
    try {
      const { response, err } = await itemApi.getItemDetail({ id });
      if (response) {
        setAnimal(response);
      }
      if (err) {
        toast.error(err);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getDogDetail();
    const getReview = async () => {
      try {
        const { response, err } = await commentApi.getComment({ product_id: +id, type: "product" });
        if (err) toast.error(err);
        if (response) {
          setReviews(response);
        }
      } catch (error) {
        toast.error("Có lỗi khi lấy bình luận!");
      }
    };
    getReview();
  }, [getDogDetail, id]);


  const exist = cartItems?.find(item => item.id === +id && item.type === "product");

  const addToCart = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Bạn phải đăng nhập để thực hiện chức năng này!");
    }
    else {
      if (qty > exist?.stock - exist?.quantity) {
        toast.error("Sản phẩm vượt quá số lượng đang có!");
        return;
      }
      dispatch(addItem({
        id: animal?.dogProductItemId,
        quantity: qty,
        price: animal?.price,
        images: animal?.images,
        itemName: animal?.itemName,
        type: "product",
        stock: animal?.quantity
      }));
      toast.success("Thêm vào giỏ hàng thành công!");
    }
  };


  return (
    <Helmet title={`${animal?.itemName}`}>
      <SectionBanner title={"Đồ cho chó"} />
      <Container maxWidth="xl" sx={{ marginBottom: "50px" }}>
        <Stack direction={ { xs: "column", md:"row" }} spacing={2} marginTop={10}>
          {/* gallery slide */}
          <Box width={{ xs:"100%", md:"50%" }}>
            {
              isLoading ? <Skeleton variant="rectangular" width="100%" /> : <ThumbsGallery image={animal?.images}/>
            }
          </Box>
          {/* gallery slide */}
          {/* info */}
          <Box width={{ xs:"100%", md:"50%" }}>
            {
              isLoading && <Skeleton variant="rectangular" width="100%" />
            }
            <Stack flexDirection="column" spacing={1} marginLeft={2}>
              <Breadcrumbs aria-label="breadcrumb" sx={{ textTransform:"uppercase" }}>
                <Link underline="hover" color="inherit" href="/">
                  PetShop
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  href="/product"
                >
                Đồ cho chó
                </Link>
                <Typography color="text.primary">{animal?.itemName}</Typography>
              </Breadcrumbs>
              <Typography variant="h4" maxWidth={400} textTransform="capitalize" fontWeight="bold" lineHeight="40px">
                {`${animal?.itemName} ${animal?.dogProductItemId}`}
              </Typography>
              <Typography component="p" color="primary.price" fontSize="21px" fontWeight="bold">
                {valueLabelFormat(animal?.price)}
              </Typography>
              <Divider sx={{ maxWidth:"400px" }}/>
              <Stack direction="column" spacing={2} textTransform="capitalize" alignItems="flex-start">
                <Typography component="p" fontWeight="bold" fontSize="20px"
                >Loại:{" "}
                  <Typography component="span">{animal?.category}</Typography>
                </Typography>
                <Typography component="p" fontWeight="bold" fontSize="20px"
                >Tình trạng:{" "}
                  <Label
                    variant="filled"
                    color={(animal?.isInStock === false && "error") || "info"}
                    sx={{
                      textTransform: "uppercase"
                    }}
                  >
                    {animal?.isInStock ? "Còn hàng" : "Hết hàng"}
                  </Label>
                </Typography>
                <Box
                  sx={{
                    width: 300,
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <Rating
                    name="text-feedback"
                    value={5}
                    readOnly
                    precision={1}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                  />
                  <Box sx={{ ml: 2 }}>Yêu thích</Box>
                </Box>
                <Box>
                  <QuantityInput max={animal?.quantity} setQty={setQty} qty={qty}/>
                </Box>
                <Typography
                  fontSize="15px" fontWeight="300"
                >{animal?.quantity} sản phẩm có sẵn</Typography>
              </Stack>
              <Box marginTop="40px !important">
                {
                  animal?.isInStock ? <Button variant="contained" size="large"
                    onClick={addToCart}
                  >
                  Thêm vào giỏ hàng
                  </Button> : <Button variant="contained" size="large"
                    onClick={() => dispatch(setModalContact(true))}
                  >
                Liên hệ
                  </Button>
                }
              </Box>
            </Stack>
          </Box>
          {/* info */}
        </Stack>
        {/* des */}
        <Box marginY={10} >
          <Button variant="contained">
            Mô tả
          </Button>
          <Divider />
          <Typography marginTop={2} lineHeight={2}>
            {
              animal?.description
            }
          </Typography>
        </Box>
        {/* des */}
        {/* review */}
        <Review reviews={reviews}/>
        {/* review */}
        <HeaderContainer header="Có thể bạn thích" icon={<ThumbUpIcon />}>
          <RecommendSlide />
        </HeaderContainer>
      </Container>
    </Helmet>
  );
};

export default ProductDetail;