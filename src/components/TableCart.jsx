import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { valueLabelFormat } from "../utils/formatter";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import TableQuantity from "./quantity/TableQuantity";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteItem, updateItem } from "~/redux/features/cartSlice";
import React, { useState } from "react";
import { toast } from "react-toastify";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: 16
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));


const TableCart = ({ cartItems }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sản phẩm</StyledTableCell>
            <StyledTableCell align="right">Giá</StyledTableCell>
            <StyledTableCell align="center">Số lượng</StyledTableCell>
            <StyledTableCell align="right">Tạm tính</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems?.map((item) => (
            <React.Fragment key={item.id+item.type}>
              <ItemTable item={item} />
            </React.Fragment>
          )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TableCart;

const ItemTable = ({ item }) => {
  const [qty, setQty] = useState(item.quantity);
  const dispatch = useDispatch();
  const handleUpdate = () => {
    if (item.type === "animal") return;
    if (qty > item?.stock) {
      toast.error("Sản phẩm vượt quá số lượng hiện đang có!");
      return;
    }
    dispatch(updateItem(
      {
        ...item, quantity: qty
      }
    ));
    toast.success("Cập nhật giỏ hàng thành công!");
  };
  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row">
        <Card sx={{ display: "flex", bgcolor:"inherit", boxShadow:"none" }}>
          <CardMedia
            component="img"
            sx={{ width: 80, height:80 }}
            image={item?.images[0]}
            alt="image"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {item?.name}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </StyledTableCell>
      <StyledTableCell align="right">{valueLabelFormat(item?.price)}</StyledTableCell>
      <StyledTableCell align="center">
        <TableQuantity
          max={item?.stock || item?.quantity}
          item={item}
          qty={qty}
          setQty={setQty}
        />
      </StyledTableCell>
      <StyledTableCell align="right">{valueLabelFormat(item?.price*item?.quantity)}</StyledTableCell>
      <StyledTableCell align="right">
        <IconButton>
          <ClearIcon
            onClick={() => dispatch(deleteItem({ id:item.id, type: item.type }))}
          />
        </IconButton>
        <Button variant="contained"
          onClick={handleUpdate}
        >Cập nhật</Button>
      </StyledTableCell>
    </StyledTableRow>
  );
};