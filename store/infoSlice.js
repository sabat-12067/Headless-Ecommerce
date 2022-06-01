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
      localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress));
    },
    setBillingAddress(state, action) {
      state.billingAddress = action.payload;
      localStorage.setItem('billingAddress', JSON.stringify(state.billingAddress));
    },
    deliveryMethod (state, action) {
      state.deliveryMethod = action.payload;
      localStorage.setItem('deliveryMethod', JSON.stringify(state.deliveryMethod));
    },
    setSaveUserInfo(state, action) {
      state.saveUserInfo = true;
      localStorage.setItem('saveUserInfo', JSON.stringify(state.saveUserInfo));
    },
    setSubscription(state, action) {
      state.subscribers = action.payload;
      console.log('My subscribers:', state.subscribers);
    },
  },
});

export const informationActions = informationSlice.actions;

export default informationSlice;

