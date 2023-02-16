export type FlagsType = {
  name: string;
  description: string;
  status: boolean;
};
export type DropDownPickerProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  list: Array<FlagsType>;
  setList: React.Dispatch<React.SetStateAction<FlagsType[]>>;
  children: string;
};
export type TestInputProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  flags: FlagsType[];
  value: string;
  setFlags: React.Dispatch<React.SetStateAction<FlagsType[]>>;
};
export interface IQuestion {
  text: string;
  expectedResult: string;
  task: string;
  possibleAnswer: string;
  difficulty: number;
  id: number;
}
export interface IGameQuestion extends IQuestion {
  isDone: boolean;
  userAnswer?: string;
}
