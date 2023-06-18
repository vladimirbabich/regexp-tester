import { createSlice } from '@reduxjs/toolkit';
import { InitialGlobalState } from './globalModels';

const initialState: InitialGlobalState = {
  notificationText: '',
  dataOfTest: null,
  dataOfQuiz: null,
  userSessionDelay: 0,
  userToken: '',
  activeMode: 'all-questions',
};
const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setActiveMode: (state, action) => {
      state.activeMode = action.payload;
    },
    setNotificationText: (state, action) => {
      state.notificationText = action.payload;
    },
    setDataOfTest: (state, action) => {
      state.dataOfTest = action.payload;
    },
    setDataOfQuiz: (state, action) => {
      state.dataOfQuiz = action.payload;
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
  setActiveMode,
  setDataOfTest,
  setDataOfQuiz,
  setNotificationText,
  setUserSessionDelay,
  setUserToken,
} = globalSlice.actions;
export default globalSlice.reducer;
