import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth", 
  initialState: { 
    isLoggedIn: false,
    userId: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
    },
    logout(state, action) {
      state.isLoggedIn = false;
    }, 
    setUserId(state, action) {
      state.userId = action.payload;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice