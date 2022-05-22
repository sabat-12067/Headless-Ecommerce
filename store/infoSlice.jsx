import { createSlice } from '@reduxjs/toolkit';

const informationSlice = createSlice({
  name: 'userInfo',
  initialState: {
    shippingAddress: '',
    billingAddress: '',
    deliveryMethod: '',
    subscribers: [],
    saveUserInfo: false,
  },
  reducers: {
    setShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      if (state.shippingAddress.subscribe) {
        state.subscribers.push(state.addressInfo.email);
      } 
    },
    setBillingAddress(state, action) {
      state.billingAddress = action.payload;
    },
    deliveryMethod (state, action) {
      state.deliveryMethod = action.payload;
    },
    setSaveUserInfo(state, action) {
      state.saveUserInfo = true;
    },
  },
});

export const informationActions = informationSlice.actions;

export default informationSlice;

