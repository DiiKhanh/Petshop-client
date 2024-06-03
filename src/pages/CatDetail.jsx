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
import dogApi from "../apis/modules/dog.api";
import { toast } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";
import Label from "../components/Label";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "~/redux/features/cartSlice";
import { setModalContact } from "~/redux/features/globalLoadingSlice";
import commentApi from "~/apis/modules/comment.api";
import { useGetDogComment, useGetPet } from "~/hooks/query/useDog";
import { Alert, CircularProgress } from "@mui/material";

const CatDetail = () => {
  const { id } = useParams();
  // const [animal, setAnimal] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const data = useGetPet(id);
  const dataReview = useGetDogComment(id);

  // const getDogDetail = useCallback(async () => {
  //   setIsLoading(true);
  //   try {
  //     const { response, err } = await dogApi.getDogDetail({ id });
  //     if (response) {
  //       setAnimal(response);
  //     }
  //     if (err) {
  //       toast.error(err);
  //     }
  //   } catch (error) {
  //     toast.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [id]);

  // const [reviews, setReviews]=useState([]);

  // useEffect(() => {
  //   getDogDetail();
  //   const getReview = async () => {
  //     try {
  //       const { response, err } = await commentApi.getComment({ product_id: +id, type: "animal" });
  //       if (err) toast.error(err);
  //       if (response) {
  //         setReviews(response);
  //       }
  //     } catch (error) {
  //       toast.error("Có lỗi khi lấy bình luận!");
  //     }
  //   };
  //   getReview();
  // }, [getDogDetail, id]);

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const { cartItems } = useSelector(state => state.cart);
  function findProductByIdAndType(productsArray, id, type) {
    return productsArray?.find(product => product.id === +id && product.type === type);
  }

  const addToCart = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Bạn phải đăng nhập để thực hiện chức năng này!");
    }
    else {
      const exist = findProductByIdAndType(cartItems, id, "animal");
      if (exist) {
        toast.error("Sản phẩm đã có trong giỏ hàng");
        return;
      }
      // dispatch(addItem({
      //   id: animal?.dogItemId,
      //   quantity: 1,
      //   price: animal?.price,
      //   images: animal?.images,
      //   dogName: animal?.dogName,
      //   type: "animal"
      // }));
      dispatch(addItem({
        id: data?.data?.dogItemId,
        quantity: 1,
        price: data?.data.price,
        images: data?.data.images,
        dogName: data?.data.dogName,
        type: "animal"
      }));
      toast.success("Thêm vào giỏ hàng thành công!");
    }
  };


  return (
    <>
      {
        data?.isLoading && <Box sx={{ display: "flex", alignItems:"center", justifyContent:"center", mt:"200px" }}>
          <CircularProgress size={100}/>
        </Box>
      }
      {
        data.error instanceof Error && <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined" >{data.error.message}</Alert>
        </Box>
      }
      {
        data.isSuccess && data?.data &&
    <Helmet title={`${data?.data.dogName}`}>
      <SectionBanner title={"Chó cảnh"} />
      <Container maxWidth="xl" sx={{ marginBottom: "50px" }}>
        <Stack direction={ { xs: "column", md:"row" }} spacing={2} marginTop={10}>
          {/* gallery slide */}
          <Box width={{ xs:"100%", md:"50%" }}>
            {
              data.isLoading ? <Skeleton variant="rectangular" width="100%" /> : <ThumbsGallery image={data?.data.images}/>
            }
          </Box>
          {/* gallery slide */}
          {/* info */}
          <Box width={{ xs:"100%", md:"50%" }}>
            {
              data.isLoading && <Skeleton variant="rectangular" width="100%" />
            }
            <Stack flexDirection="column" spacing={1} marginLeft={2}>
              <Breadcrumbs aria-label="breadcrumb" sx={{ textTransform:"uppercase" }}>
                <Link underline="hover" color="inherit" href="/">
                  PetShop
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  href="/dog"
                >
                Giống chó
                </Link>
                <Typography color="text.primary">{data?.data.dogName}</Typography>
              </Breadcrumbs>
              <Typography variant="h4" maxWidth={400} textTransform="capitalize" fontWeight="bold" lineHeight="40px">
                {`${data?.data.dogName} ${data?.data.dogItemId}`}
              </Typography>
              <Typography component="p" color="primary.price" fontSize="21px" fontWeight="bold">
                {valueLabelFormat(data?.data.price)}
              </Typography>
              <Divider sx={{ maxWidth:"400px" }}/>
              <Stack direction="column" spacing={2} textTransform="capitalize">
                <Typography component="p" fontWeight="bold" fontSize="20px"
                >Giống:{" "}
                  <Typography component="span">{data?.data.dogSpeciesName}</Typography>
                </Typography>
                <Typography component="p" fontWeight="bold" fontSize="20px"
                >Màu:{" "}
                  <Typography component="span">{data?.data.color}</Typography>
                </Typography>
                <Typography component="p" fontWeight="bold" fontSize="20px"
                >Tuổi:{" "}
                  <Typography component="span">{data?.data.age}{" tháng"}</Typography>
                </Typography>
                <Typography component="p" fontWeight="bold" fontSize="20px"
                >Giới tính:{" "}
                  <Typography component="span">{data?.data.sex === "male" ? "Đực" : "Cái"}</Typography>
                </Typography>
                <Typography component="p" fontWeight="bold" fontSize="20px"
                >Sức khỏe:{" "}
                  <Typography component="span">{data?.data.healthStatus}</Typography>
                </Typography>
                <Typography component="p" fontWeight="bold" fontSize="20px"
                >Nguồn gốc:{" "}
                  <Typography component="span">{data?.data.origin}</Typography>
                </Typography>
                <Typography component="p" fontWeight="bold" fontSize="20px"
                >Tình trạng:{" "}
                  <Label
                    variant="filled"
                    color={"info"}
                    sx={{
                      textTransform: "uppercase"
                    }}
                  >
                  Có sẵn
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
              </Stack>
              <Box marginTop="40px !important">
                {
                  data?.data.isInStock ? <Button variant="contained" size="large"
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
              data?.data?.description
            }
          </Typography>
        </Box>
        {/* des */}
        {/* review */}
        {
          dataReview?.data &&
        <Review reviews={dataReview?.data} />
        }
        {/* review */}
        <HeaderContainer header="Có thể bạn thích" icon={<ThumbUpIcon />}>
          <RecommendSlide type="dog" />
        </HeaderContainer>
      </Container>
    </Helmet>
      }
    </>

  );

};

export default CatDetail;