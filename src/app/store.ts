import { configureStore } from '@reduxjs/toolkit';
import globalSlice from '../features/global/globalSlice';
import testFormSlice from '../features/testForm/testFormSlice';
import testInputSlice from '../features/testInput/testInputSlice';
import { apiSlice } from '../features/api/apiSlice';
const store = configureStore({
  reducer: {
    global: globalSlice,
    testInput: testInputSlice,
    testForm: testFormSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
