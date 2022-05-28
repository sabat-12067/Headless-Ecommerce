import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth", 
  initialState: { 
    isLoggedIn: false,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
    },
    logout(state, action) {
      state.isLoggedIn = false;
    }, 
  },
});

export const authActions = authSlice.actions;

export default authSlice