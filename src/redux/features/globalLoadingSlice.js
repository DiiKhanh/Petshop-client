import { createSlice } from "@reduxjs/toolkit";

export const globalLoadingSlice = createSlice({
  name: "GlobalLoading",
  initialState: {
    globalLoading: false,
    modalContact: false
  },
  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
    setModalContact: (state, action) => {
      state.modalContact = action.payload;
    }
  }
});

export const { setGlobalLoading, setModalContact } = globalLoadingSlice.actions;

export default globalLoadingSlice.reducer;