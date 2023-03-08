import { createSlice } from '@reduxjs/toolkit';
import { IDropDownPickerList, IQuestion } from '../../types';
type InitialState = {
  currentQuestion: IQuestion | null;
  flags: IDropDownPickerList[];
  selectedFunction: string;
};
const initialState: InitialState = {
  currentQuestion: null,
  //   {
  //     text: '',
  //     expectedResult: '',
  //     task: '',
  //     possibleAnswer: '',
  //     difficulty: -1,
  //     id: -1,
  //     functionName: '',
  //   }
  flags: [
    {
      name: 'g',
      description: 'all matches',
      status: false,
    },
    {
      name: 'i',
      description: 'case insensitive',
      status: false,
    },
    {
      name: 'm',
      description: 'multiline',
      status: false,
    },
  ],
  selectedFunction: 'match',
};

const testFormSlice = createSlice({
  name: 'testForm',
  initialState,
  reducers: {
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    updateFlag: (state, action) => {
      state.flags = state.flags.map((el) => {
        if (el.name == action.payload) return { ...el, status: !el.status };
        return { ...el };
      });
    },
    resetFlags: (state) => {
      state.flags = [...initialState.flags];
    },
    setSelectedFunction: (state, action) => {
      state.selectedFunction = action.payload;
    },
  },
});
export const {
  setCurrentQuestion,
  updateFlag,
  resetFlags,
  setSelectedFunction,
} = testFormSlice.actions;
export default testFormSlice.reducer;
