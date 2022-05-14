import { createSlice } from '@reduxjs/toolkit';

const informationSlice = createSlice({
  name: 'userInfo',
  initialState: { userInfo: '', subscribe: false, saveUserInfo: false },
  reducers: {
    setUserInfo(state, action) {
      const infoDetails = action.payload;
      state.userInfo = {
        email: infoDetails.email,
        mobile: infoDetails.mobile,
        country: infoDetails.country,
        firstName: infoDetails.firstName,
        lastName: infoDetails.lastName,
        address: infoDetails.address,
        city: infoDetails.city,
        apartment: infoDetails.apartment,
      };
    },
    setSubscribe(state, action) {
      state.subscribe = true;
    },
    setSaveUserInfo(state, action) {
      state.saveUserInfo = true;
    }
  },
});

export const informationActions = informationSlice.actions;

export default informationSlice;
