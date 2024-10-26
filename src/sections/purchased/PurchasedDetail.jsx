import { useParams } from "react-router-dom";
import Helmet from "~/components/Helmet";
import { Container, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import { Box, Button, List, ListItemAvatar, Stack, Typography } from "@mui/material";
import { valueLabelFormat } from "~/utils/formatter";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setModalContact } from "~/redux/features/globalLoadingSlice";
import commentApi from "~/apis/modules/comment.api";
import { useGetPurchased } from "~/hooks/query/usePurchased";

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,#2dc258 0%,#2dc258 50%,rgb(138,35,135) 100%)"
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,#2dc258 0%,#2dc258 50%,rgb(138,35,135) 100%)"
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:"#eaeaf0",
    borderRadius: 1
  }
}));

const ColorlibStepIconRoot = styled("div")(({ ownerState }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, #2dc258 0%, #2dc258 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, #2dc258 0%, #2dc258 50%, rgb(138,35,135) 100%)"
  })
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <ReceiptIcon />,
    2: <LocalShippingIcon />,
    3: <CheckBoxIcon />
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node
};


const PurchasedDetail = () => {
  const { id } = useParams();
  const steps = ["Đang lấy hàng", "Đang giao", "Thành công"];
  // const [item, setItem] = useState();
  // const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const item = useGetPurchased(id);

  // useEffect(() => {
  //   const get = async () => {
  //     try {
  //       const { response, err } = await checkoutApi.getDetail({ id });
  //       if (err) {
  //         toast.error(err);
  //       }
  //       if (response) {
  //         setItem(response);
  //         setData(response.data);
  //       }
  //     } catch (error) {
  //       toast.error(error);
  //     }
  //   };
  //   get();
  // }, [id]);

  return (

    <>
      {
        item.isSuccess && item?.data &&
    <Helmet title={`purchased ${id}`}>
      <Container maxWidth="lg" sx={{ marginY: "8rem" }}>
        <Stack marginY={1} bgcolor="#fff">
          <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
            <Typography>Mã hóa đơn: {item?.data.id}</Typography>
            <Box display="flex">
              {
                item?.data.status === "Thành công" && <Typography marginX="4px" color="green">Đơn hàng đã được giao thành công</Typography>
              }
              <Divider orientation="vertical" flexItem sx={{ marginX:1 }}/>
              <Typography textTransform="uppercase" fontWeight="bold" color="primary.price">
                {item?.data.status}
              </Typography>
            </Box>
          </Box>
          <Divider orientation="horizontal" />
          <Box my={5}>
            <Stepper alternativeLabel activeStep={
              item?.data.status === "Thành công" ? 2 : item?.data.status === "Đang giao" ? 1 : 0
            } connector={<ColorlibConnector />}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Divider orientation="horizontal" />
          <Box display="flex" justifyContent="space-between" p={2}>
            <Box flex={2}>

              {
                item?.data.address && <Stack>
                  <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
                    Thông tin người nhận
                  </Typography>
                  <ListItemText sx={{ display:"flex", alignItems:"center", gap: 2 }} primary="Họ tên:" secondary={<Typography>
                    {item?.data.name}
                  </Typography>}
                  />
                  <ListItemText sx={{ display:"flex", alignItems:"center", gap: 2 }} primary="Địa chỉ:" secondary={<Typography>
                    {item?.data.address}
                  </Typography>}
                  />
                  <ListItemText sx={{ display:"flex", alignItems:"center", gap: 2 }} primary="Số điện thoại:" secondary={<Typography>
                    {item?.data.phoneNumber}
                  </Typography>}
                  />
                  <ListItemText sx={{ display:"flex", alignItems:"center", gap: 2 }} primary="Email:" secondary={<Typography>
                    {item?.data.email}
                  </Typography>}
                  />
                </Stack>
              }

            </Box>
            <Timeline sx={{ flex:1 }}>
              <TimelineItem>
                <TimelineOppositeContent
                  sx={{ m: "auto 0" }}
                  align="right"
                  variant="body2"
                  color="text.secondary"
                >
                  {item?.data.createAt !== item?.data.updatedAt && item && new Date(item?.data.updatedAt).toISOString().replace("T", " ").replace(/\.\d{3}Z/, "")}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color={item?.data.status === "Thành công" ? "success" : "grey"} >
                    <LocalShippingIcon fontSize="small"/>
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ m:"auto 0" }}>Giao thành công</TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent
                  sx={{ m: "auto 0" }}
                  align="right"
                  variant="body2"
                  color="text.secondary"
                >
                  {item?.data.createAt !== item?.data.updatedAt && item && new Date(item?.data.updatedAt).toISOString().replace("T", " ").replace(/\.\d{3}Z/, "")}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color={item?.data.status === "Đang giao hàng" || item?.data.status === "Thành công" ? "success" : "grey"} >
                    <LocalShippingIcon fontSize="small"/>
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ m:"auto 0" }}>Đang giao hàng</TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent
                  sx={{ m: "auto 0" }}
                  align="right"
                  variant="body2"
                  color="text.secondary"
                >
                  {item && new Date(item?.data.createAt).toISOString().replace("T", " ").replace(/\.\d{3}Z/, "")}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="success" >
                    <TaskAltIcon fontSize="small"/>
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ m:"auto 0" }}>Đang lấy hàng</TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent
                  sx={{ m: "auto 0" }}
                  align="right"
                  variant="body2"
                  color="text.secondary"
                >
                  {item && new Date(item?.data.createAt).toISOString().replace("T", " ").replace(/\.\d{3}Z/, "")}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot sx={{ m: "auto 0" }} color="success">
                    <TaskAltIcon fontSize="small"/>
                  </TimelineDot>
                </TimelineSeparator>
                <TimelineContent sx={{ m: "auto 0" }}>Đặt đơn hàng thành công</TimelineContent>
              </TimelineItem>
            </Timeline>
          </Box>
          <Divider orientation="horizontal" />
          <List>
            {
              item?.data?.data.map(i =>
                <Box key={i.name}>
                  <Comment i={i} item={item.data}/>
                </Box>
              )
            }
          </List>
          <Box display="flex" alignItems="end" p={2} flexDirection="column" gap={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography>Thành tiền:</Typography>
              <Typography component="p" color="primary.price" fontWeight="bold">
                {valueLabelFormat(item?.data.total)}
              </Typography>
            </Box>
            <Button variant="outlined" sx={{ color:"#333" }}
              onClick={() => dispatch(setModalContact(true))}
            >
              Liên hệ người bán</Button>
          </Box>
        </Stack>
      </Container>
    </Helmet>
      }
    </>
  );
};

export default PurchasedDetail;

export const Comment = ({ i, item }) => {

  const [value, setValue] = useState("");

  const handleComment = async () => {
    const data = {
      product_id: i.id,
      type: i.type,
      username: item.name,
      user_id: item.user_id,
      content: value
    };
    const { response, err } = await commentApi.create(data);
    if (err) {
      toast.error(err);
    }
    if (response) {
      toast.success("Đã đăng đánh giá thành công, đợi xét duyệt");
      setValue("");
    }
  };

  return (
    <Stack>
      <ListItem sx={{ gap:2 }}>
        <ListItemAvatar>
          <img src={i?.images[0]} alt="img-order"
            height="100px" width="100px" style={{ objectFit:"cover" }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={i?.name}
        />
        <Typography variant="subtitle1">
          {i?.quantity} x {" "}
          {valueLabelFormat(i?.price)}
        </Typography>
      </ListItem>
      {
        item.status === "Thành công"
      &&
      <>
        <TextField label="Viết đánh giá"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button variant="contained"
          onClick={handleComment}
        >Đánh giá</Button>
      </>
      }
    </Stack>
  );
};