import { createSlice } from '@reduxjs/toolkit';

const productIdSlice = createSlice({
 name: 'Id',
 initialState: {id: ''},
 reducers: {
   setProductId(state, action) {
     const productId = action.payload;
     state.id = productId;
   }
 }
});

export const productIdActions = productIdSlice.actions;

export default productIdSlice;