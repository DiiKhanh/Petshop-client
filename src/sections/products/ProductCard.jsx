import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Label from "../../components/Label";
import { valueLabelFormat } from "../../utils/formatter";
import { useNavigate } from "react-router-dom";
// ----------------------------------------------------------------------

export default function ProductCard({ product }) {
  const renderStatus = (
    <Label
      variant="filled"
      color={(product.isInStock === false && "error") || "info"}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: "absolute",
        textTransform: "uppercase"
      }}
    >
      {product.isInStock ? "Còn" : "Hết"}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={product.itemName}
      src={product.images[0]}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: "cover",
        position: "absolute"
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: "text.disabled",
          textDecoration: "line-through"
        }}
      >
        {!product.isInStock && valueLabelFormat(product.price)}
      </Typography>
      &nbsp;
      {valueLabelFormat(product.price)}
    </Typography>
  );
  const navigate = useNavigate();

  return (
    <Card sx={{
      boxShadow: `0 0 2px 0 #919EAB, 0 12px 24px -4px #919EAB`,
      borderRadius: 3,
      position: "relative",
      cursor:"pointer"
    }}
    component="div"
    onClick={() => navigate(`/product/${product.dogProductItemId}`) }
    >
      <Box sx={{ pt: "100%", position: "relative" }}>
        {renderStatus}
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" fontSize="1rem" noWrap>
          {product.itemName}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {renderPrice}
        </Stack>
      </Stack>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object
};