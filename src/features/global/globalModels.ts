import { createSlice } from '@reduxjs/toolkit';
import { ITestQuestion } from '../../models/objectModels';
export type InitialGlobalState = {
  activeMode: string;
  notificationText: string;
  dataOfTest: DataOfTest | null;
  dataOfQuiz: DataOfQuiz | null;
  userSessionDelay: number;
  userToken: string;
};
export type DataOfTest = {
  userId: number;
  modeName: string;
  timeSpent: string;
  ITestQuestions: ITestQuestion[];
};

export type DataOfQuiz = {
  userId: number;
  quizId: number;
  timeSpent: string;
  score: number;
};
