import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    token: null
  },
  reducers: {
    // setUser: (state, action) => {
    //   if (action.payload === null) {
    //     localStorage.removeItem("token");
    //   } else if (action.payload.token) localStorage.setItem("token", action.payload.token);
    //   state.user = action.payload;
    // }
    setUser: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    }
  }
});

export const {
  setUser, clearUser
} = userSlice.actions;

export default userSlice.reducer;