import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const data = [
  {
    title: "Miễn phí vận chuyển toàn quốc",
    image: "https://petnow.com.vn/wp-content/uploads/2023/08/Midnight-Blue-Kids-Brand-Logo-1.gif"
  },
  {
    title: "Bộ quà tặng trị giá 500k",
    image: "https://petnow.com.vn/wp-content/uploads/2023/08/Midnight-Blue-Kids-Brand-Logo-3.gif"
  },
  {
    title: "Cam kết chất lượng",
    image: "https://petnow.com.vn/wp-content/uploads/2023/08/Midnight-Blue-Kids-Brand-Logo-4.gif"
  },
  {
    title: "Bảo hành sức khỏe",
    image: "https://petnow.com.vn/wp-content/uploads/2023/08/Midnight-Blue-Kids-Brand-Logo-2.gif"
  }
];

const Benefit = () => {
  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="center" alignItems="center"
      spacing={1}
    >
      {
        data?.map((item, idx) => (
          <Box key={idx}>
            <Box>
              <img src={item.image} alt="img" width={300} loading="lazy"/>
            </Box>
            <Typography variant="body2" color="text.secondary" fontSize="16px"
              textAlign="center" >
              {item.title}
            </Typography>
          </Box>
        ))
      }
    </Stack>
  );
};

export default Benefit;