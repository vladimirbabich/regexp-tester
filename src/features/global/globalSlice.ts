import { createSlice } from '@reduxjs/toolkit';
type InitialState = {
  // isFlagsBlockOpen: boolean;
};
const initialState: InitialState = {
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
