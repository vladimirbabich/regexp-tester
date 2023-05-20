import { createSlice } from '@reduxjs/toolkit';
import { InitialGlobalState } from './globalModels';

const initialState: InitialGlobalState = {
  notificationText: '',
  dataOfTest: null,
  userSessionDelay: 0,
  userToken: '',
};
const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setNotificationText: (state, action) => {
      state.notificationText = action.payload;
    },
    setDataOfTest: (state, action) => {
      state.dataOfTest = action.payload;
    },
    setUserSessionDelay: (state, action: { payload: number; type: string }) => {
      state.userSessionDelay = action.payload;
    },
    setUserToken: (state, action: { payload: string; type: string }) => {
      state.userToken = action.payload;
      if (action.payload) localStorage.setItem('userToken', action.payload);
      else localStorage.removeItem('userToken');
    },
  },
});
export const {
  setDataOfTest,
  setNotificationText,
  setUserSessionDelay,
  setUserToken,
} = globalSlice.actions;
export default globalSlice.reducer;
