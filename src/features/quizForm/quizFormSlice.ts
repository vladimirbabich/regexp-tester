import { createSlice, current } from '@reduxjs/toolkit';
import { PreparedQuizQuestion, QuizQuestion } from '../../models/objectModels';
type InitialState = {
  isTestOver: boolean;
  currentUserAnswer: string[];
  currentQuestionIndex: number;
  questions: QuizQuestion[];
  currentQuestion: PreparedQuizQuestion | null;
};
const initialState: InitialState = {
  isTestOver: false,
  currentUserAnswer: [],
  currentQuestion: null,
  currentQuestionIndex: -1,
  questions: [],
};

const quizFormSlice = createSlice({
  name: 'testForm',
  initialState,
  reducers: {
    updateCurrentUserAnswer: (state, action) => {
      if (!action.payload) {
        state.currentUserAnswer = [];
        return;
      }
      const { answerId, type } = action.payload;

      if (type === 'radio') {
        state.currentUserAnswer = [answerId];
        return;
      }
      if (type === 'checkbox') {
        const index = state.currentUserAnswer.indexOf(answerId);
        if (index != -1) {
          state.currentUserAnswer = state.currentUserAnswer.filter(
            (a) => a !== answerId
          );
        } else {
          state.currentUserAnswer.push(answerId);
        }
      }
    },
    setQuestions: (
      state,
      action: { payload: QuizQuestion[]; type: string }
    ) => {
      try {
        if (action.payload) {
          if (action.payload.length < 1) return;
          let sortedQuestions = [...action.payload].sort(() =>
            Math.random() > 0.5 ? 1 : -1
          );
          //set whole array
          state.questions = sortedQuestions;
          state.currentQuestionIndex = 0;

          state.currentQuestion = {
            ...sortedQuestions[0],
            allOptions: [
              ...sortedQuestions[0].answers
                .split('||')
                .map((str) =>
                  str
                    .replaceAll('*b', '\\')
                    .replaceAll('*s', '/')
                    .replaceAll('*p', '|')
                ),
              ...sortedQuestions[0].options
                .split('||')
                .map((str) =>
                  str
                    .replaceAll('*b', '\\')
                    .replaceAll('*s', '/')
                    .replaceAll('*p', '|')
                ),
            ].sort(() => (Math.random() > 0.5 ? 1 : -1)),
            ansCount: sortedQuestions[0].answers.split('||').length,
          };
        }
      } catch (e) {
        console.error(e);
      }
    },
    updateCurrentQuestionAnswer: (state, action) => {
      try {
        if (state.currentQuestionIndex > -1) {
          //update answer of a question
          state.questions[state.currentQuestionIndex].userAnswer =
            action.payload;
          state.currentUserAnswer = [];
          state.currentQuestionIndex++;
          if (state.currentQuestionIndex === state.questions.length) {
            state.isTestOver = true;
            return;
          }
          state.currentQuestion = {
            ...state.questions[state.currentQuestionIndex],
            allOptions: [
              ...state.questions[state.currentQuestionIndex].answers
                .split('||')
                .map((str) =>
                  str
                    .replaceAll('*b', '\\')
                    .replaceAll('*s', '/')
                    .replaceAll('*p', '|')
                ),
              ...state.questions[state.currentQuestionIndex].options
                .split('||')
                .map((str) =>
                  str
                    .replaceAll('*b', '\\')
                    .replaceAll('*s', '/')
                    .replaceAll('*p', '|')
                ),
            ].sort(() => (Math.random() > 0.5 ? 1 : -1)),
            ansCount:
              state.questions[state.currentQuestionIndex].answers.split('||')
                .length,
          };
        } else {
          console.error('Unpredicted payload: quizForm.updateQuestions');
        }
      } catch (e) {
        console.error(e);
      }
    },
    setIsTestOver: (state, action) => {
      state.isTestOver = action.payload;
    },
  },
});
export const {
  updateCurrentUserAnswer,
  setQuestions,
  setIsTestOver,
  updateCurrentQuestionAnswer,
} = quizFormSlice.actions;
export default quizFormSlice.reducer;
