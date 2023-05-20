import { createSlice } from '@reduxjs/toolkit';
import { ITestQuestion } from '../../models/objectModels';
export type InitialGlobalState = {
  notificationText: string;
  dataOfTest: DataOfTest | null;
  userSessionDelay: number;
  userToken: string;
};
export type DataOfTest = {
  userId: number;
  modeName: string;
  timeSpent: string;
  ITestQuestions: ITestQuestion[];
};
