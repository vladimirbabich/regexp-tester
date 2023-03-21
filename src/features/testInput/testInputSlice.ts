import { createSlice } from '@reduxjs/toolkit';
type InitialState = {
  isFlagsBlockOpen: boolean;
};
const initialState: InitialState = {
  isFlagsBlockOpen: false,
};
const testInputSlice = createSlice({
  name: 'testInput',
  initialState,
  reducers: {
    setIsFlagsBlockOpen: (state, action) => {
      state.isFlagsBlockOpen = action.payload;
    },
  },
});
export const { setIsFlagsBlockOpen } = testInputSlice.actions;
export default testInputSlice.reducer;
