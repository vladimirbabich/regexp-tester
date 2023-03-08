import { configureStore } from '@reduxjs/toolkit';
import globalSlice from '../features/global/globalSlice';
import testFormSlice from '../features/testForm/testFormSlice';
import testInputSlice from '../features/testInput/testInputSlice';
const store = configureStore({
  reducer: {
    global: globalSlice,
    testInput: testInputSlice,
    testForm: testFormSlice,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
