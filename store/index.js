import { configureStore } from '@reduxjs/toolkit';
import quantitySlice from './quantitySlice';
import cartSlice from './cartSlice';

const store = configureStore({
 reducer: { quantityValue: quantitySlice.reducer,
  cart: cartSlice.reducer,
  }
});

export default store;