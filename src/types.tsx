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
  setFlags: React.Dispatch<React.SetStateAction<FlagsType[]>>;
};
