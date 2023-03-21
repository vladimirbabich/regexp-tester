export const initialText = `Lorem ipsum ipsum1 dolor3 34 45 4 -2 -3 -4 -2 sit amet,\n
consectetur adipiscing elit. Mauris eget nisi nec metus dignissim ultrices et a lectus.
 Morbi nibh est, tempor sed feugiat nec, tristique eu augue. Suspendisse lobortis non nulla in porttitor. Morbi a fermentum dolor, ut tempus diam. Aliquam molestie, enim at maximus feugiat, risus erat hendrerit dui, at porta erat enim ut massa. Maecenas elementum ac augue sed tempor. Aliquam nec rutrum velit. Curabitur eu dapibus lectus.`;
export const expectedResult = 'ipsum';

export function getResult(
  text: string,
  pattern: string,
  functionName: string,
  flags?: string
) {
  try {
    const regExp = new RegExp(pattern, flags);
    if (pattern.length === 0) return undefined;

    if (functionName == 'substitution') {
      return text.replace(regExp, '');
    }
    const matchArray = text.match(regExp);
    if (!matchArray) return undefined;
    if (flags && flags.length > 0) {
      // console.log(matchArray);
      return matchArray
        .filter((el) => {
          if (el) return el;
        })
        .join('|');
    } else {
      if (matchArray[0] ?? false) {
        //if matchArray !=null/undefined
        return matchArray[0];
      }
    }
  } catch (e) {
    if (typeof e === 'string') {
      console.log(typeof e); // works, `e` narrowed to string
      console.log(e); // works, `e` narrowed to string
      // return e;
    } else if (e instanceof Error) {
      console.error(e.message); // works, `e` narrowed to Error
      // return e.message;
    }
  }
}

/*
    no flags - match(regExp)
    g - add ?.join("")
    i - same

    */
