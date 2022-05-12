import { createSlice } from '@reduxjs/toolkit';

const productIdSlice = createSlice({
 name: 'Id',
 initialState: {id: ''},
 reducers: {
   setProductId(state, action) {
     const grabProductId = action.payload;
     state.id = grabProductId.productId;
   }
 }
});

export const productIdActions = productIdSlice.actions;

export default productIdSlice;