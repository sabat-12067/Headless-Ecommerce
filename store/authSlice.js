import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth", 
  initialState: { 
    userId: null,
  },
  reducers: {
    setUserId(state, action) {
     state.userId = action.payload;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice