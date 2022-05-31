import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    showCart: false,
    buyItNowItemDetails: '',
    isBuyItNowBtnClicked: false,
    isAddToCartBtnClicked: false,
  },
  reducers: {
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },
    //delete item from cart
    removeItem(state, action) {
      const id = action.payload
      const productToBeDeleted = state.cartItems.find(item => item.id === id);
      if(productToBeDeleted) {
         state.cartItems = state.cartItems.filter(item => item.id !== id)
      }
      //update local storage with the new cart items state
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    //increment quantity of item within cart
    incrementCartQuantity(state, action) {
        const id = action.payload;
        state.cartItems.map(item => {
          if(item.id === id) {
            item.quantity += 1;
            item.totalPrice = item.quantity * item.price;
          }
        })
        //update local storage with the new cart items state
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      },
   
    //decrement quantity of item within cart
      decrementCartQuantity(state, action) {
        const id = action.payload;
        state.cartItems.map(cartItem => {
          if(cartItem.id === id) {
            cartItem.quantity -= 1;
            if(cartItem.quantity <= 1) {
              cartItem.quantity = 1;
            }
            cartItem.totalPrice = cartItem.quantity * cartItem.price;
          }
        })
        //update local storage with the new cart items state
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      },
    
      setShowCart(state, action) {
       state.showCart = !state.showCart;
    },
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice;