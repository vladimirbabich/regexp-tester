import { IDropDownPickerList } from './models/objectModels';

const defaultTimeAmount = 2;

export function getFlagsString(array: Array<IDropDownPickerList>) {
  let str = array
    .filter((el) => {
      if (el.status) return 1;
      return 0;
    })
    .map((el) => el.name)
    .join('');
  return str;
}

export function getDiverseMatches(arr1: string[], arr2: string[]) {
  const getDiverseElements = (arr1: string[], arr2: string[]) => {
    return arr1.filter((el: string) => {
      if (!arr2.includes(el)) return 1;
      else return 0;
    });
  };

  const diversedArr1 = getDiverseElements(arr1, arr2);
  const diversedArr2 = getDiverseElements(arr2, arr1);

  return [diversedArr1, diversedArr2];
}

export { defaultTimeAmount };
