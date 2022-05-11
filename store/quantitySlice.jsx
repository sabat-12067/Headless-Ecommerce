import { createSlice } from '@reduxjs/toolkit';

const quantitySlice = createSlice({
  name: 'quantity',
  initialState: { quantity: 1 },
  reducers: {
    increment(state, action) {
      state.quantity++;
    },
    decrement(state, action) {
      state.quantity--;
      if (state.quantity <= 0) {
        state.quantity = 1;
      }
    },
  },
});

export const quantityActions = quantitySlice.actions;

export default quantitySlice;
