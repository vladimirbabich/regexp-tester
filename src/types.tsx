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
};
export interface IQuestion {
  text: string;
  expectedResult: string;
  task: string;
  possibleAnswer: string;
  difficulty: number;
  id: number;
  functionName: string;
}
export interface ISolvedQuestion extends IQuestion {
  userAnswer: string;
}
