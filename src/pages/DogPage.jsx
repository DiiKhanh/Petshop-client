import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Helmet from "../components/Helmet";
import SectionBanner from "../components/SectionBanner";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import { valueLabelFormat } from "../utils/formatter";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { categories } from "../assets/data";
import GridList from "../components/GridList";
import dogApi from "../apis/modules/dog.api";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const DogPage = () => {
  const [sort, setSort] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const [value, setValue] = useState(14000000);

  const handleChange = (event, newValue) => {
    if (typeof newValue === "number") {
      setValue(newValue);
    }
  };

  const getAllDog = async () => {
    setIsLoading(true);
    try {
      const { response, err } = await dogApi.getAll();
      if (response) {
        setData(response);
      }
      if (err) {
        toast.error(err);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllDog();
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Helmet title="Chó cảnh">
      <SectionBanner title={"Chó cảnh"}/>
      <Container maxWidth="xl" sx={{ marginTop:"5rem" }}>
        <Stack direction="row">
          <Box width="20%" marginTop="56px" >
            {/* price */}
            <Stack direction="column" spacing={1}
              sx={{
                border:"1px solid #ECE7E2",
                backgroundColor:"transparent",
                borderRadius:"15px",
                padding:"15px 20px",
                marginBottom:"20px"
              }}
            >
              <Typography variant="h6">Giá</Typography>
              <Box>
                <Slider
                  value={value}
                  min={5000000}
                  step={500000}
                  max={20000000}
                  getAriaValueText={valueLabelFormat}
                  valueLabelFormat={valueLabelFormat}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  aria-labelledby="non-linear-slider"
                />
                <Typography id="non-linear-slider" gutterBottom>
                  Dưới: {valueLabelFormat(value)}
                </Typography>
              </Box>
              <Button variant="contained">
                Lọc
              </Button>
            </Stack>
            {/* categories */}
            <Stack direction="column" spacing={1}
              sx={{
                border:"1px solid #ECE7E2",
                backgroundColor:"transparent",
                borderRadius:"15px",
                padding:"15px 20px"
              }}>
              <Typography variant="h6">Giống chó</Typography>
              <Box >
                <List component="nav" aria-label="categories">
                  {
                    categories?.map((item, idx) => (
                      <ListItemButton key={idx}
                        selected={selectedIndex === idx}
                        onClick={(event) => handleListItemClick(event, idx)}
                      >
                        <ListItemText primary={item?.name} sx={{ textTransform:"capitalize" }}/>
                        <ListItemIcon>
                          <ArrowForwardIcon />
                        </ListItemIcon>
                      </ListItemButton>
                    ))
                  }
                </List>
              </Box>
            </Stack>
          </Box>
          <Box width="80%">
            <Stack flexDirection="row" justifyContent="space-between" marginX={5}>
              {/* search */}
              <Box
                sx={{
                  width: 450,
                  maxWidth: "100%"
                }}
              >
                <TextField fullWidth label="Tìm kiếm" id="search"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Box>

              {/* sort */}
              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth >
                  <InputLabel id="demo-simple-select-label">Sắp xếp</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="sắp xếp"
                    value={sort}
                    onChange={handleSortChange}
                  >
                    <MenuItem value="">
                      <em>Sắp xếp</em>
                    </MenuItem>
                    <MenuItem value="price">Theo giá</MenuItem>
                    <MenuItem value="categories">Theo loại</MenuItem>
                    <MenuItem value="lastest">Mới nhất</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {/*  */}
            </Stack>
            <Box padding={5}>
              {
                isLoading && <Box sx={{ display: "flex", marginLeft:"200px" }}>
                  <CircularProgress size={100}/>
                </Box>
              }
              {
                data.length > 0 && <GridList data={data} />
              }
            </Box>
          </Box>
        </Stack>
      </Container>
    </Helmet>
  );
};

export default DogPage;