import { createSlice } from '@reduxjs/toolkit';
//Deleting items from cart and increamenting the quantity of items in cart was handled in the redux store becuase I failed to grab their updated state from the local storage. But after changing them, I synced the updated state to the one of local storage.
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    showCart: false,
    buyItNowItem: '',
    totalQuantity: 0,
    isBuyItNowBtnClicked: false,
    isAddToCartBtnClicked: false,
  },
  reducers: {
    setCartItems(state, action) {
      state.cartItems = JSON.parse(localStorage.getItem('cartItems'));
      console.log('Redux cart items', state.cartItems);
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
            // if(cartItem.quantity <= 1) {
            //   cartItem.quantity = 1;
            // }
            cartItem.totalPrice = cartItem.quantity * cartItem.price;
          }
        })
        //update local storage with the new cart items state
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      },
    
      setShowCart(state, action) {
       state.showCart = !state.showCart;
    },
    setIsAddToCartBtnClicked(state, action) {
      state.isAddToCartBtnClicked = action.payload;
    },
    setBuyItNowItem(state, action) {
      state.buyItNowItem = action.payload;
    },
    setTotalQuantity(state, action) {
      state.totalQuantity = action.payload;
    }
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;