import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Helmet from "../components/Helmet";
import SectionBanner from "../components/SectionBanner";
import itemApi from "../apis/modules/item.api";
import { toast } from "react-toastify";
import ProductView from "../sections/products/ProductView";

const ProductPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllItems = async () => {
    setIsLoading(true);
    try {
      const { response, err } = await itemApi.getAllItems();
      if (response) {
        setData(response);
      }
      if (err) {
        toast.error(err);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <Helmet title="Đồ cho chó">
      <SectionBanner title={"Đồ cho chó"}/>
      <Container maxWidth="xl" sx={{ marginY:"5rem" }}>
        {
          isLoading && <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        }
        {
          data && <ProductView products={data} />
        }
      </Container>
    </Helmet>
  );
};

export default ProductPage;