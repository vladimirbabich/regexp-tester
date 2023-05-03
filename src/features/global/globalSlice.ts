import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { ITestQuestion } from '../../Models';
import { InitialState } from './globalModels';

const initialState: InitialState = {
  notificationText: '',
  dataOfTest: null,
  userSessionDelay: 0,
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
  },
});
export const { setDataOfTest, setNotificationText, setUserSessionDelay } =
  globalSlice.actions;
export default globalSlice.reducer;
