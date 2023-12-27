import { useState } from "react";

import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { listClasses } from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: "newest", label: "Mới nhất" },
  { value: "price", label: "Theo giá" },
  { value: "category", label: "Theo loại" }
];

export default function ProductSort() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={handleOpen}
        endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
      >
        Sắp xếp:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: "text.secondary" }}>
          Mới nhất
        </Typography>
      </Button>

      <Menu
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              [`& .${listClasses.root}`]: {
                p: 0
              }
            }
          }
        }}
      >
        {SORT_OPTIONS.map((option) => (
          <MenuItem key={option.value} selected={option.value === "newest"} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}