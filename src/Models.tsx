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
export type DropDownPickerFlagsPropsType = {
  isMultiple: boolean;
  children: string;
};
export type TestInputProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  mode?: string;
};
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
export interface IRecordData {
  // [key: string]: ITestData[];
  all: IAllData[];
  min5: IMin5Data[];
  flags: INoflagsData[];
}

export interface IRecordData2 {
  all: IAllData[];
  min5: IMin5Data2[];
  flags: INoflagsData[];
}

export interface IMin5Data {
  id: number;
  userName: string;
  solvedAmount: number;
  skippedAmount: number;
}
export interface IMin5Data2 {
  id: number;
  userName: string;
  solvedAmount: number;
  skippedAmount: number;
  field1: number;
  field2: number;
  field3: number;
  field4: number;
  field5: number;
  field6: number;
}
export interface IAllData {
  id: number;
  userName: string;
  solvedAmount: number;
  skippedAmount: number;
  timeSpent: number;
}
export interface INoflagsData {
  id: number;
  userName: string;
  solvedAmount: number;
  skippedAmount: number;
  timeSpent: number;
}

export interface ITestData {
  id: number;
  userName: string;
  solvedAmount: number;
  skippedAmount: number;
  timeSpent?: number;
}
