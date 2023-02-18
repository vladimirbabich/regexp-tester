import { MutableRefObject } from "react";

export interface IDropDownPickerList {
  name: string;
  description: string;
  status: boolean;
}
export type DropDownPickerFlagsPropsType = {
  isMultiple: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  list: Array<IDropDownPickerList>;
  setList: React.Dispatch<React.SetStateAction<IDropDownPickerList[]>>;
  children: string;
};
export type TestInputProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  flags: IDropDownPickerList[];
  setFlags: React.Dispatch<React.SetStateAction<IDropDownPickerList[]>>;
  regExpFunctions: string[];
  currentFunction: string;
  setCurrentFunction: React.Dispatch<React.SetStateAction<string>>;
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
export interface IGameQuestion extends IQuestion {
  isDone: boolean;
  userAnswer?: string;
}
