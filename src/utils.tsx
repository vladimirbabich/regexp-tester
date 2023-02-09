import { FlagsType } from "./types";

export function getFlagsString(array: Array<FlagsType>) {
  let str = array
    .filter((el) => {
      // console.log(el.status);
      if (el.status) return 1;
      return 0;
    })
    .map((el) => el.name)
    .join("");
  // console.log(str);
  return str;
}
