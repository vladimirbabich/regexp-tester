import { MutableRefObject } from 'react';

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
  possibleAnswer: string;
  difficulty: number;
  id: number;
  functionName: string;
  userAnswer?: string;
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
  noflags: INoflagsData[];
}

export interface IMin5Data {
  id: number;
  userName: string;
  solvedAmount: number;
  skippedAmount: number;
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
