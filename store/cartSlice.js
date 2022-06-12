import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    showCart: false,
  },
  reducers: {
    setCartItems(state, action) {
      state.cartItems = JSON.parse(localStorage.getItem('cartItems'));
      console.log('Redux cart items', state.cartItems);
    },
    
      setShowCart(state, action) {
       state.showCart = !state.showCart;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;