import { createSlice } from '@reduxjs/toolkit';
import { getCartItemsFromLocalStorage } from '../components/HorLine';

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
    addToCart(state, action) {
      const newProduct = action.payload;
      //check if the product is already in the cart
      const existingProduct = state.cartItems.find(item => item.id === newProduct.id);

      if(existingProduct) {
        existingProduct.quantity += newProduct.quantity;
        existingProduct.totalPrice = existingProduct.quantity * existingProduct.price 
      } else {
        state.cartItems.push({
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
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    //clear cartItemsList 
    clearCart(state) { 
      state.cartItems = []
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
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      },
    
      setShowCart(state, action) {
       state.showCart = !state.showCart;
    },
   
    //item info for the order summary section of the details page
    buyItNow(state, action) {
      const buyItNowItem = action.payload;
      state.buyItNowItemDetails = {
        name: buyItNowItem.name,
        price: buyItNowItem.price,
        quantity: buyItNowItem.quantity,
        imageUrl: buyItNowItem.imageThumbnail,
        discountPrice: buyItNowItem.discountPrice,
        discountPercentage: buyItNowItem.discountPercentage,
      };
    },
    // setIsBuyItNowBtnClicked(state, action) {
    //   state.isBuyItNowBtnClicked = true;
    //   state.isAddToCartBtnClicked = false;
    //   localStorage.setItem('isBuyItNowBtnClicked', JSON.stringify(state.isBuyItNowBtnClicked));
    //   localStorage.setItem('isAddToCartBtnClicked', JSON.stringify(state.isAddToCartBtnClicked));
    // },
    // setIsAddToCartBtnClicked(state, action) {
    //   state.isAddToCartBtnClicked = true;
    //   state.isBuyItNowBtnClicked = false;
    //   localStorage.setItem('isBuyItNowBtnClicked', JSON.stringify(state.isBuyItNowBtnClicked));
    //   localStorage.setItem('isAddToCartBtnClicked', JSON.stringify(state.isAddToCartBtnClicked));
    //   console.log('add to cart button clicked');
    // }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice;