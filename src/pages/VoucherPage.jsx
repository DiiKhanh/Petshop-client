import Helmet from "../components/Helmet";
import { Container, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import voucherApi from "../apis/modules/voucher.api";
import { valueLabelFormat } from "../utils/formatter";

const VoucherPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      try {
        const { response, err } = await voucherApi.getAll();
        if (err) {
          toast.error(err);
        }
        if (response) {
          setData(response);
        }
      } catch (error) {
        toast.error(error);
      }
    };
    getAll();
  }, []);

  return (
    <Helmet title="Khuyến mãi">
      <Container maxWidth="xl" sx={{ marginTop:"5rem" }}>
        <Stack spacing={2}>
          <Typography fontSize="21px">Các mã khuyến mãi tại Petshop</Typography>
          {
            data && data.length>0 && data.map((item) => <Card key={item?.voucher_id} >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                Giảm: {valueLabelFormat(item?.discount_value)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                Mã giảm giá: {item?.code}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Thời gian bắt đầu: {item?.start_date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  Thời gian hết hạn: {item?.end_date}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>)
          }
        </Stack>
      </Container>
    </Helmet>
  );
};

export default VoucherPage;