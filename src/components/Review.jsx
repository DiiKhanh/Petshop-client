import React from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Divider, Stack, TextField, Typography } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import HeaderContainer from "./HeaderContainer";
import TextAvatar from "./TextAvatar";

const ReviewItem = ({ review }) => {

  return (
    <Box sx={{
      padding: 2,
      borderRadius: "5px",
      position: "relative",
      "&:hover": { backgroundColor: "background.paper" }
    }}>
      <Stack direction="row" spacing={2}>
        {/* avatar */}
        <TextAvatar text={review.username} />
        {/* avatar */}
        <Stack spacing={2} flexGrow={1}>
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight="700">
              {review.username}
            </Typography>
            <Typography variant="caption">
              {dayjs(review.createAt).format("DD-MM-YYYY HH:mm:ss")}
            </Typography>
          </Stack>
          <Typography variant="body1" textAlign="justify">
            {review.content}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );

};

// const reviews = [
//   {
//     comment_id: 1,
//     product_id: 1,
//     type:"animal",
//     user_id: "asdsd",
//     username: "dk123",
//     content: "San pham oke",
//     createAt: 1640690400000
//   }
// ];

const Review = ({ reviews }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <React.Fragment>
      <HeaderContainer header={`Đánh giá ${reviews?.length > 0 ? reviews.length : 0}`}>
        <Stack spacing={4} marginBottom={2}>
          {reviews?.map((item) => (
            <Box key={item.comment_id}>
              <ReviewItem review={item} />
              <Divider sx={{
                display: { xs: "block", md: "none" }
              }} />
            </Box>
          ))}

        </Stack>
        {user && (
          <React.Fragment>
            <Divider />
            <Stack direction="row" spacing={2}>
              <TextAvatar text={user.username} />
              <Stack spacing={2} flexGrow={1}>
                <Typography variant="h6" fontWeight="700">
                  {user.username}
                </Typography>
                <TextField
                  multiline
                  rows={4}
                  placeholder="Viết đánh giá của bạn"
                  variant="outlined"
                />
                <LoadingButton
                  variant="contained"
                  size="large"
                  sx={{ width: "max-content" }}
                  startIcon={<SendOutlinedIcon />}
                  loadingPosition="start"
                  onClick={() => toast.error("Bạn phải mua sản phẩm mới có thể đánh giá, nếu bạn đã mua thành công hãy vào lịch sử đơn hàng để đánh giá")}
                >
                  Gửi
                </LoadingButton>
              </Stack>
            </Stack>
          </React.Fragment>
        )}
      </HeaderContainer>
    </React.Fragment>
  );
};

export default Review;