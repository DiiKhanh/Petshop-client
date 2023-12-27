import Grid from "@mui/material/Grid";
// import { animals } from "../assets/data";
import AnimalItem from "./AnimalItem";

const GridList = ({ data }) => {
  return (
    <Grid container spacing={2}>
      {
        data?.map((item, idx) => (
          <Grid item xs={6} sm={4} md={4} key={idx}>
            <AnimalItem item={item} />
          </Grid>
        ))
      }
    </Grid>
  );
};

export default GridList;