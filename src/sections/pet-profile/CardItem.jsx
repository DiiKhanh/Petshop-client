import Divider from "@mui/material/Divider";
import { Box, Button, ButtonGroup, List, ListItemAvatar, Stack, Typography } from "@mui/material";
import { valueLabelFormat } from "~/utils/formatter.js";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import FormSignup from "./FormSignup";
import bookingApi from "~/apis/modules/booking.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setModalContact } from "~/redux/features/globalLoadingSlice";

const CardItem = ({ item, data }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const newData = data?.filter(i => {
    return item.map(d => d.id === i.dog_item_id && d.type === "animal");
  });

  const handleCancel = async (id) => {
    const { response, err } = await bookingApi.cancel({ id });
    if (response) {
      toast.success("Đã hủy thành công!");
      window.location.reload();
    }
    if (err) {
      toast.error("Có lỗi khi hủy!");
    }
  };


  return (
    <>

      {
        item.map((data) => {
          const appointment = newData.find(i => i.dog_item_id === data.id);
          return <React.Fragment key={data.id}>
            {
              data.type === "animal" &&
              <Stack marginY={1} bgcolor="#fff">
                <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                  <Typography>Mã thú cưng: {data?.id}</Typography>
                  <Box display="flex">

                    <Button variant="contained" onClick={() => setOpen(true)}
                      disabled={appointment && appointment.status==="Pending"}
                    >Đăng ký dịch vụ khám</Button>
                    {
                      appointment && appointment.status==="Pending" &&
                      <Button color="error"
                        onClick={() => handleCancel(appointment.appointment_id)}
                      >Hủy đăng ký</Button>
                    }
                  </Box>
                </Box>

                <Divider orientation="horizontal" />
                <List>

                  <ListItem sx={{ gap:2 }} key={data.name}>
                    <ListItemAvatar>
                      <img src={data?.images[0]} alt="img-order"
                        height="100px" width="100px" style={{ objectFit:"cover" }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={data?.name}
                    />
                    <Typography variant="subtitle1">
                      {data?.quantity} x {" "}
                      {valueLabelFormat(data?.price)}
                    </Typography>
                  </ListItem>
                </List>

                <Divider orientation="horizontal" />
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                  >
                    <Typography>Thông tin chi tiết</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography>Trạng thái đăng ký:</Typography>
                      <Typography component="p" fontWeight="bold">
                        {appointment && appointment.status}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography>Tình trạng sức khỏe:</Typography>
                      <Typography component="p" fontWeight="bold">
                        {appointment && appointment.status === "Completed" ? "Đã đăng ký khám thành công" : "Chưa khám"}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography>Đăng ký dịch vụ:</Typography>
                      <Typography component="p" fontWeight="bold">
                        {appointment && appointment.service}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography>Kết quả sau khi khám:</Typography>
                      <Typography component="p" fontWeight="bold">
                        {appointment && appointment.result}
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Box display="flex" alignItems="start" p={2} flexDirection="column" gap={2}>
                  <ButtonGroup sx={{ marginY: 1, gap:2 }}>
                    <Button variant="contained" sx={{ color:"#333" }}
                      onClick={() => dispatch(setModalContact(true))}
                    >Liên hệ người bán</Button>
                  </ButtonGroup>
                </Box>
                {
                  open && <FormSignup open={open} handleClose={handleClose} item={data} />
                }
              </Stack>

            }

          </React.Fragment>;
        })
      }


    </>
  );
};

export default CardItem;