import { Box, Stack, Typography } from "@mui/material";


function ShippingMethod({ method, title, desc }) {
  return (
    <Stack direction="row" alignItems="center" spacing="20px">
      <img src={`/assets/images/${method}.svg`} alt="" width={50} height={50} />
      <Box>
        <Typography sx={{ fontWeight: 500, textTransform: "uppercase" }}>{title}</Typography>
        <Typography sx={{ fontSize: "14px" }}>{desc}</Typography>
      </Box>
    </Stack>
  );
}

export default ShippingMethod;