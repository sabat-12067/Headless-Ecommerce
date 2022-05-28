import { configureStore } from '@reduxjs/toolkit';
import quantitySlice from './quantitySlice';
import cartSlice from './cartSlice';
import productIdSlice from './productIdSlice';
import informationSlice from './infoSlice';
import authSlice from './authSlice';

const store = configureStore({
 reducer: { quantityValue: quantitySlice.reducer,
  cart: cartSlice.reducer,
  Id: productIdSlice.reducer,
  information: informationSlice.reducer,
  auth: authSlice.reducer,
  }
});

export default store;