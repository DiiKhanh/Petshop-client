import React, { useEffect, useState } from "react";
import checkoutApi from "~/apis/modules/checkout.api";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import CardItem from "./CardItem";
import bookingApi from "~/apis/modules/booking.api";

const ListPet = ({ user }) => {
  const [listItem, setListItem] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const get = async () => {
      try {
        const { response, err } = await checkoutApi.getList({ user_id:user.id });
        if (err) {
          toast.error(err);
        }
        if (response) {
          const res = response?.map(item => item.data);
          let arr = [];
          res.forEach((item) => {
            arr = [...arr, item];
          });
          setListItem(arr);
        }
      } catch (error) {
        toast.error(error);
      }
    };

    const getBooking = async () => {
      try {
        const { response, err } = await bookingApi.getAll({ user_id:user.id });
        if (err) {
          toast.error(err);
          return;
        }
        if (response) {
          setData(response);
        }
      } catch (error) {
        toast.error(error);
      }
    };

    get();
    getBooking();
  }, [user]);


  return (
    <>
      {
        listItem.length === 0 ? <Typography>Chưa có thú cưng nào được mua</Typography> :
          <>
            {
              listItem.map((item, idx) =>
                <React.Fragment key={idx}>
                  <CardItem item={item} data={data}/>
                </React.Fragment>
              )
            }
          </>

      }
    </>
  );
};

export default ListPet;