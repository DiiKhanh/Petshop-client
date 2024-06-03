import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardItem from "./CardItem";
import { toast } from "react-toastify";
import checkoutApi from "~/apis/modules/checkout.api";

const ListWaitPayment = ({ user, value, index, listItem, ...other }) => {
  // const [listItem, setListItem] = useState([]);

  // useEffect(() => {
  //   const get = async () => {
  //     try {
  //       const { response, err } = await checkoutApi.getList({ user_id:user.id });
  //       if (err) {
  //         toast.error(err);
  //       }
  //       if (response) {
  //         setListItem(response);
  //       }
  //     } catch (error) {
  //       toast.error(error);
  //     }
  //   };

  //   get();

  // }, [user]);

  return (
    <>
      {
        listItem.length === 0 ? <Typography>Chưa có sản phẩm nào</Typography> :
          <>
            <div
              role="tabpanel"
              hidden={value !== index}
              id={`simple-tabpanel-${index}`}
              aria-labelledby={`simple-tab-${index}`}
              {...other}
            >
              {
                listItem.map(item =>
                  item.payment === "chưa thanh toán" &&
                  <React.Fragment key={item.id+item.user_id}>
                    <CardItem item={item}/>
                  </React.Fragment>
                )
              }
            </div>
          </>
      }
    </>
  );
};

export default ListWaitPayment;