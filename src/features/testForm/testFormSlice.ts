import { createSlice } from '@reduxjs/toolkit';
import {
  AskedQuestion,
  IDropDownPickerList,
  IQuestion,
} from '../../models/objectModels';
type InitialState = {
  currentQuestion: IQuestion | null;
  flags: IDropDownPickerList[];
  selectedFunction: string;
  isTestOver: boolean;
  askedQuestions: AskedQuestion[];
  activeMode: string;
};
const initialState: InitialState = {
  currentQuestion: null,
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
    {
      name: 's',
      description: 'singleline',
      status: false,
    },
  ],
  selectedFunction: 'match',
  isTestOver: false,
  askedQuestions: [],
  activeMode: 'only-flags',
};

const testFormSlice = createSlice({
  name: 'testForm',
  initialState,
  reducers: {
    setActiveMode: (state, action) => {
      state.activeMode = action.payload;
    },
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    updateFlag: (state, action) => {
      state.flags = state.flags.map((el) => {
        if (el.name === action.payload) return { ...el, status: !el.status };
        return { ...el };
      });
    },
    resetFlags: (state) => {
      state.flags = [...initialState.flags];
    },
    setSelectedFunction: (state, action) => {
      state.selectedFunction = action.payload;
    },
    setIsTestOver: (state, action) => {
      state.isTestOver = action.payload;
    },
    setAskedQuestions: (state, action) => {
      state.askedQuestions = action.payload;
    },
    restartTest: (state) => {
      state.isTestOver = false;
      state.flags = [...initialState.flags];
    },
  },
});
export const {
  setActiveMode,
  setCurrentQuestion,
  updateFlag,
  resetFlags,
  setSelectedFunction,
  setIsTestOver,
  restartTest,
  setAskedQuestions,
} = testFormSlice.actions;
export default testFormSlice.reducer;
