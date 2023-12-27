import { Box, Typography, CircularProgress } from "@mui/material";

const CircularRate = () => {
  return (
    <Box sx={{
      position: "relative",
      display: "inline-block",
      width: "max-content"
    }}>
      <CircularProgress variant="determinate" value={100} color="primary" size={50} />
      <Box sx={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Typography
          variant="caption"
          component="div"
          fontWeight="700"
          sx={{ marginTop: "-5px" }}
        >
          10/10
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularRate;