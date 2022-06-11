import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth", 
  initialState: { 
    isloggedIn: false,
    userId: null,
  },
  reducers: {
    setIsLoggedIn(state, action) {
      //state.isloggedIn = action.payload;
     // sessionStorage.setItem("isloggedIn", state.isloggedIn);
    }, 
    setUserId(state, action) {
     // state.userId = action.payload;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice