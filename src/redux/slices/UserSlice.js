import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie } from "cookies-next";

const initialState = {
  user: undefined,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = undefined;

      deleteCookie("token");
      deleteCookie("role");
    },
  },
});

export const { setUser,logout } = UserSlice.actions;

export default UserSlice.reducer;
