import { createSlice } from '@reduxjs/toolkit';

const informationSlice = createSlice({
  name: 'userInfo',
  initialState: {
    addressInfo: '',
    deliveryMethod: '',
    subscribers: [],
    saveUserInfo: false,
  },
  reducers: {
    setAddressInfo(state, action) {
      state.addressInfo = action.payload;
      if (state.addressInfo.subscribe) {
        state.subscribers.push(state.addressInfo.email);
      } 
    },
    setNewAddressInfo(state, action) {
      state.addressInfo = action.payload;
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

