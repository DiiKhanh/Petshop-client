// import { useState } from "react";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

import ProductCard from "./ProductCard";
import ProductSort from "./ProductSort";
// import ProductFilters from "./ProductFilters";
import { filter } from "lodash";
import { Paper } from "@mui/material";
import { useState } from "react";

function applySortFilter(array, query) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  if (query) {
    return filter(array, (_data) => _data.itemName?.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis?.map((el) => el[0]);
}

// ----------------------------------------------------------------------

export default function ProductsView({ products }) {
  // const [openFilter, setOpenFilter] = useState(false);

  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };
  const [filterName, setFilterName] = useState("");
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const filteredUsers = applySortFilter(products, filterName);

  const isNotFound = !filteredUsers?.length && !!filterName;

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5,
        fontWeight: 700,
        lineHeight: 1.5,
        fontSize: `${24 / 16}rem`
      }}>
        Sản phẩm cho chó
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="space-between"
        sx={{ mb: 5 }}
      >
        <Box
          sx={{
            width: 450,
            maxWidth: "100%"
          }}
        >
          <TextField fullWidth label="Tìm kiếm" id="search"
            value={filterName}
            onChange={handleFilterByName}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Box>
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          {/* <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          /> */}
          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {filteredUsers.map((product) => (
          <Grid key={product.dogProductItemId} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      {isNotFound && (

        <Paper
          sx={{
            textAlign: "center"
          }}
        >
          <Typography variant="h6" paragraph>
Not found
          </Typography>
          <Typography variant="body2">
No results found for &nbsp;
            <strong>&quot;{filterName}&quot;</strong>.
            <br /> Try checking for typos or using complete words.
          </Typography>
        </Paper>

      )}
    </Container>
  );
}