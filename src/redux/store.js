import { configureStore } from "@reduxjs/toolkit";
import globalLoadingSlice from "./features/globalLoadingSlice";
import userSlice from "./features/userSlice";
import cartSlice from "./features/cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const userConfig = {
  key: "petshop/user",
  storage,
  whitelist: ["user", "token"]
};

const cartConfig = {
  key: "petshop/cart",
  storage,
  whitelist: ["cartItems", "totalAmount", "shipInfo"]
};

export const store = configureStore({
  reducer: {
    globalLoading: globalLoadingSlice,
    user: persistReducer(userConfig, userSlice),
    cart: persistReducer(cartConfig, cartSlice)
  }
});

export const persistor = persistStore(store);