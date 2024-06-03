import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  shipInfo:null
};

const cartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems?.find(
        (item) => {
          return item.id === newItem.id && item.type === newItem.type;
        }
      );
      if (!existingItem) {
        state.cartItems?.push({
          id: newItem.id,
          quantity: newItem.quantity,
          price: newItem.price,
          name: newItem.dogName || newItem.itemName,
          images: newItem.images,
          type: newItem.type,
          stock: newItem?.stock
        });
      } else if (existingItem.type === "product") {
        existingItem.quantity += newItem.quantity;
      }

      state.totalAmount = state.cartItems?.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
    deleteItem: (state, action) => {
      const { id, type } = action.payload;
      if (type === "animal") {
        const existingItem = state.cartItems?.find((item) => item.id === id);
        if (existingItem) {
          state.cartItems = state.cartItems?.filter((item) => item.id !== id && item.type !== type);
          state.totalQuantity = state.totalQuantity - existingItem.quantity;
        }
        state.totalAmount = state.cartItems?.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0
        );
      } else if (type === "product") {
        const existingItem = state.cartItems?.find((item) => item.id === id);
        if (existingItem) {
          state.cartItems = state.cartItems?.filter((item) => item.id !== id);
          state.totalQuantity = state.totalQuantity - existingItem.quantity;
        }
        state.totalAmount = state.cartItems?.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0
        );
      }

    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
    createShipInfo: (state, action) => {
      state.shipInfo = action.payload;
    },
    setTotalAmount: (state, action) => {
      const temp = state.totalAmount - action.payload;
      if (temp < 0) {
        state.totalAmount = 0;
      } else {
        state.totalAmount = temp;
      }
    },
    updateItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems?.find(
        (item) => {
          return item.id === newItem.id;
        }
      );
      if (!existingItem) return;
      existingItem.quantity = newItem.quantity;
      state.totalAmount = state.cartItems?.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    }
  }
});

export const { clearCart, deleteItem, addItem, createShipInfo,
  setTotalAmount, updateItem
} =
  cartSlice.actions;

export default cartSlice.reducer;