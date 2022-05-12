import { configureStore } from '@reduxjs/toolkit';
import quantitySlice from './quantitySlice';
import cartSlice from './cartSlice';
import productIdSlice from './productIdSlice';

const store = configureStore({
 reducer: { quantityValue: quantitySlice.reducer,
  cart: cartSlice.reducer,
  Id: productIdSlice.reducer,
  }
});

export default store;