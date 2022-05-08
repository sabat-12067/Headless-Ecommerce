import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItemsList: [],
    totalQuantity: 0,
    showCart: false,
  },
  reducers: {
    addToCart(state, action) {
      const newProduct = action.payload;
      //check if the product is already in the cart
      const existingProduct = state.cartItemsList.find(item => item.id === newProduct.id);

      if(existingProduct) {
        existingProduct.quantity += newProduct.quantity;
        existingProduct.totalPrice = existingProduct.quantity * existingProduct.price 
      } else {
        state.cartItemsList.push({
         id: newProduct.id,
         name: newProduct.name,
         price: newProduct.price,
         quantity: newProduct.quantity,
         imageUrl: newProduct.image,
         discountPrice: newProduct.discountPrice,
         discountPercentage: newProduct.discountPercentage,
         totalPrice: newProduct.price * newProduct.quantity,
        });
      }
    },
    removeItem(state, action) {},
    setShowCart(state, action) {
       state.showCart = !state.showCart;
    }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice;