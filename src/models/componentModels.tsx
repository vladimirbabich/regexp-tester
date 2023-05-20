import { MutableRefObject } from 'react';
import {
  AskedQuestion,
  handleChangeInputParamsType,
  ITestResult,
} from './objectModels';

export interface IDropDownPicker {
  isMultiple: boolean;
  children: string;
}

export interface IAnalyzer {
  title: string;
}
export type DocumentEventType<T extends Document> = Event & {
  target: T;
};
export interface ILeaderboardTable {
  data: ITestResult[];
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  dataOnServerCount: number;
}
export type ITestInput = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  mode?: string;
};
export interface INavigation {
  className: string;
}
export interface INotification {
  position: { x: number; y: number };
}
export interface IQuestionBlock {
  question: AskedQuestion;
  questionId: number;
}
export interface ISelect {
  isMultiple: boolean;
}
export interface ISign {
  handleChangeInput: handleChangeInputParamsType;
  handleSwitchClick: (
    e: React.MouseEvent<HTMLOptionElement, MouseEvent>
  ) => void;
}
export interface ISignNotification {
  text: string;
  className: string;
}
export interface ITestForm {
  title: string;
  mode: string;
}
export interface ITestScore {
  skippedAmount: number;
  solvedAmount: number;
}
