import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItemsList: [],
    showCart: false,
    buyItNowItemDetails: '',
    isBuyItNowBtnClicked: false,
    isAddToCartBtnClicked: false,
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
      console.log('cartItemsList rendered');
    },

    //delete item from cart
    removeItem(state, action) {
      const id = action.payload
      const productToBeDeleted = state.cartItemsList.find(item => item.id === id);
      if(productToBeDeleted) {
         state.cartItemsList = state.cartItemsList.filter(item => item.id !== id)
      }
    },

    //clear cartItemsList 
    clearCart(state) { 
      state.cartItemsList = []
    },
    
    //increment quantity of item within cart
    incrementCartQuantity(state, action) {
        const id = action.payload;
        state.cartItemsList.map(item => {
          if(item.id === id) {
            item.quantity += 1;
            item.totalPrice = item.quantity * item.price;
          }
        })
      },
   
    //decrement quantity of item within cart
      decrementCartQuantity(state, action) {
        const id = action.payload;
        state.cartItemsList.map(item => {
          if(item.id === id) {
            item.quantity -= 1;
            if(item.quantity <= 1) {
              item.quantity = 1;
            }
            item.totalPrice = item.quantity * item.price;
          }
        })
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
    setIsBuyItNowBtnClicked(state, action) {
      state.isBuyItNowBtnClicked = true;
      state.isAddToCartBtnClicked = false;
    },
    setIsAddToCartBtnClicked(state, action) {
      state.isAddToCartBtnClicked = true;
      state.isBuyItNowBtnClicked = false;
      console.log('add to cart button clicked');
    }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice;