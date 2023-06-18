import { MutableRefObject } from 'react';
import {
  AskedQuestion,
  handleChangeInputParamsType,
  ILeaderboardColumnSetting,
  ILeaderboardFetchInfo,
  IQuizResult,
  ITestResult,
  QuizQuestion,
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
  data: ITestResult[] | IQuizResult[] | undefined;
  columns: ILeaderboardColumnSetting[];
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  dataOnServerCount: number;
  isDataLoading: boolean;
}
export type ITestInput = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  mode?: string;
  inputRef: React.RefObject<HTMLInputElement>;
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
  askedQuestions?: AskedQuestion[];
  quizQuestions?: QuizQuestion[];
  timeSpent: number;
  handleRestartClick: (e: React.MouseEvent) => void;
}

export interface IQuizFormBody {
  question: QuizQuestion;
}
export interface IQuizBlock {
  question: QuizQuestion;
  questionId: number;
}
export interface IStartMenu {
  title: string;
  text: string | string[];
  btnText: string;
  handleClick: () => void;
}
