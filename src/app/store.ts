import { configureStore } from '@reduxjs/toolkit';
import globalSlice from '../features/global/globalSlice';
import testInputSlice from '../features/testInput/testInputSlice';
const store = configureStore({
  reducer: {
    global: globalSlice,
    testInput: testInputSlice,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
