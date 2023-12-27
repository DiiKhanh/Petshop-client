import { ButtonGroup, Button } from "@mui/material";
import { useState } from "react";


const total = 5;
const SelectQuantity = ({ quantity, item }) => {
  const [q, setQ] = useState(quantity);
  const handleChange = (e) => {
    if (e.target.value < 0 ) {
      setQ(1);
      return;
    }
    if (e.target.value >= total)
    {
      setQ(total);
      return;
    }
    setQ(e.target.value);

  };
  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
      <Button
        color="inherit"
        disabled={q <= 0}
        onClick={() => {
          setQ((counter) => counter === 1 ? 1 : counter - 1);
          return;
        }}
      >
        -
      </Button>
      <input value={q} style={{ maxWidth:"50px",
        textAlign:"center" }
      }
      onChange={handleChange}
      />
      <Button
        color="inherit"
        disabled={q >= total}
        onClick={() => {
          setQ((counter) => counter === total ? counter : counter + 1);
          return;
        }}
      >
        +
      </Button>
    </ButtonGroup>

  );
};

export default SelectQuantity;