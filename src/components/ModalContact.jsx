import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Logo from "./Logo";
import { setModalContact } from "~/redux/features/globalLoadingSlice";
import { Stack, Typography } from "@mui/material";


const ModalContact = () => {
  const dispatch = useDispatch();
  const { modalContact } = useSelector(state => state.globalLoading);

  const handleCloseAuthModal = () => dispatch(setModalContact(false));


  return (
    <Modal open={modalContact} onClose={handleCloseAuthModal}>
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "100%",
        maxWidth: "800px",
        padding: 4,
        outline: "none"
      }}>
        <Box sx={{ padding: 4, boxShadow: 24, backgroundColor: "background.paper" }}>
          <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
            <Logo/>
          </Box>
          {/*  */}
          <Stack alignItems="center">
            <Typography fontWeight="bold">
              Liên hệ Zalo: 0886025625 nếu bạn muốn tìm hiểu và mua sản phẩm đang hết hàng này!
              Hoặc có thắc mắc về sản phẩm đã mua.
            </Typography>
            <Box display='flex' alignItems="center">
              <img alt="zalo" src="/assets/zalo.svg" style={{
                objectFit:"cover",
                width:"140px"
              }}/>
              <img alt="zaloqr" src="/assets/zalo-qr.jpg" style={{
                objectFit:"cover",
                height:"500px"
              }}/>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalContact;