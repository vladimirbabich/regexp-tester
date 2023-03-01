import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  //for future reasons
};
const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    xxx: (state, action) => {
      // state. = action.payload;
    },
  },
});
export const { xxx } = globalSlice.actions;
export default globalSlice.reducer;
