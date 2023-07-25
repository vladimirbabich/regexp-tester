import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { MutableRefObject } from 'react';

export interface ITestResult {
  id: number;
  timeSpent: string;
  score: number;
  createdAt: string;
  ansCount: number;
  ansDiff: string;
  skpCount: number;
  skpDiff: string;
  username: string;
  version: string;
}
export interface IQuizResult {
  id: number;
  timeSpent: string;
  createdAt: string;
  score: number;
  quizId: number;
  userId: number;
  username: string;
}
export interface ILeaderboardColumnSetting {
  name: string;
  description: string | undefined;
  attribute: string;
}
export interface IUserToken {
  id: number;
  nickname: string;
  iat: number;
  exp: number;
}

export interface ITestQuestion {
  questionId: number;
  difficulty: number;
  userAnswer?: string;
}

export interface IDropDownPickerList {
  name: string;
  description: string;
  status: boolean;
}

export interface IQuestion {
  text: string;
  expectedResult: string;
  task: string;
  difficulty: number;
  id: number;
  functionName: string;
  userAnswer?: string;
  possibleAnswer?: string;
}
export interface IResultMatch {
  match: string;
  isUnique: boolean;
  isTest?: boolean;
}

export interface ILeaderboardFetchInfo {
  activeMode: string;
  error?: FetchBaseQueryError | SerializedError | undefined;
  isDataLoading: boolean;
}

export interface IDecodedUserToken {
  id: number;
  nickname: string;
  iat: number;
  exp: number;
}

export type AskedQuestion = {
  difficulty: number;
  expectedResult: string;
  functionName: string;
  id: number;
  possibleAnswer: string;
  task: string;
  text: string;
  userAnswer?: string;
};
export type handleChangeInputParamsType = (
  ref1: React.MutableRefObject<HTMLInputElement | undefined>,
  ref2: React.MutableRefObject<HTMLInputElement | undefined>,
  btnSetter: React.Dispatch<React.SetStateAction<boolean>>
) => void;

export type FetchedQuizType = {
  data: FetchedQuizQuestion[];
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
};

export type FetchedQuizQuestion = {
  question: string;
  options: string;
  answers: string;
  difficulty: number;
  id: number;
  quizId: number;
};
export type QuizQuestion = {
  question: string;
  options: string;
  answers: string;
  difficulty: number;
  userAnswer?: Array<string>;
};
export type PreparedQuizQuestion = {
  question: string;
  allOptions: string[];
  difficulty: number;
  ansCount: number;
};

export enum Colors {
  RED = 'rgb(255 164 163)',
  BGRED = 'rgb(255 164 163 / 5%)',
  GREEN = 'rgb(178 235 167)',
  BGGREEN = 'rgb(178 235 167 / 5%)',
  YELLOW = 'rgb(241 241 149)',
  BGYELLOW = 'rgb(241 241 149 / 5%)',
}

export type QuizResultOption = {
  option: string;
  isSelected: boolean;
};
