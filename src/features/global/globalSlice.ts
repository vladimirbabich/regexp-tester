import { createSlice } from '@reduxjs/toolkit';
type InitialState = {
  defaultNickname: string;
  notificationText: string;
  isNotificationActive: boolean;
};
const initialState: InitialState = {
  defaultNickname: 'user',
  notificationText: 'Average difficulty of answered questionsverage difficulty of answered questionsverage difficulty of answered questionsverage difficulty of answered questionsverage difficulty of answered questionsverage difficulty of answered questions',
  isNotificationActive: false,
};
const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setDefaultNickname: (state, action) => {
      state.defaultNickname = action.payload;
    },
    setNotificationText: (state, action) => {
      state.notificationText = action.payload;
    },
    setIsNotificationActive: (state, action) => {
      state.isNotificationActive = action.payload;
    },
  },
});
export const {
  setDefaultNickname,
  setIsNotificationActive,
  setNotificationText,
} = globalSlice.actions;
export default globalSlice.reducer;
