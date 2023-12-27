import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const BredItem = ({ item }) => {
  return (
    <Card sx={{ maxWidth: 345,
      transition: "all 0.2s linear",
      "&:hover":{
        transform:"translateY(-8px)"
      }
    }} >
      <CardMedia
        image={item?.image}
        title={item?.name}
        sx={{
          height: "350px",
          width:"100%",
          objectFit:"cover"
        }}
      />
      <CardContent >
        <Typography gutterBottom variant="h5" component="div" textTransform="capitalize"
          textAlign="center"
          fontWeight="bold"
        >
          {item?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" fontSize="15px"
          textAlign="center"
        >
          {item?.short_des}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent:"center" }}>
        <Button
          variant="contained"
          size="large"
          sx={{ width: "max-content" }}
        >
          Xem thêm
        </Button>
      </CardActions>
    </Card>
  );
};

export default BredItem;