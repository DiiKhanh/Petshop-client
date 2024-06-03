import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Helmet from "../components/Helmet";
import SectionBanner from "../components/SectionBanner";
import itemApi from "../apis/modules/item.api";
import { toast } from "react-toastify";
import ProductView from "../sections/products/ProductView";
import { useGetAllItem } from "~/hooks/query/useItem";
import { Alert } from "@mui/material";

const ProductPage = () => {
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // const getAllItems = async () => {
  //   setIsLoading(true);
  //   try {
  //     const { response, err } = await itemApi.getAllItems();
  //     if (response) {
  //       setData(response);
  //     }
  //     if (err) {
  //       toast.error(err);
  //     }
  //   } catch (error) {
  //     toast.error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getAllItems();
  // }, []);
  const data = useGetAllItem();

  return (
    <Helmet title="Sản phẩm cho thú cưng">
      <SectionBanner title={"Sản phẩm cho thú cưng"}/>
      <Container maxWidth="xl" sx={{ marginY:"5rem" }}>
        {
          data.isLoading && <Box sx={{ display: "flex", alignItems:"center", justifyContent:"center", mt:"200px" }}>
            <CircularProgress />
          </Box>
        }
        {
          data.error instanceof Error && <Box sx={{ marginTop: 2 }}>
            <Alert severity="error" variant="outlined" >{data.error.message}</Alert>
          </Box>
        }
        {
          data.isSuccess && data?.data && <ProductView products={data.data} />
        }
      </Container>
    </Helmet>
  );
};

export default ProductPage;