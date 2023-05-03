import { createSlice } from '@reduxjs/toolkit';
import { ITestQuestion } from '../../Models';
export type InitialState = {
  notificationText: string;
  dataOfTest: DataOfTest | null;
  userSessionDelay: number;
};
export type DataOfTest = {
  userId: number;
  modeName: string;
  timeSpent: string;
  ITestQuestions: ITestQuestion[];
};
