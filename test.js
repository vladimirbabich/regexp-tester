const array = [
  {
    text: "Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget nisi nec metus dignissim ultrices et a lectus. Morbi nibh est, tempor sed feugiat nec, tristique eu augue. Suspendisse lobortis non nulla in porttitor. Morbi a fermentum dolor, ut tempus diam. Aliquam molestie, enim at maximus feugiat, risus erat hendrerit dui, at porta erat enim ut massa. Maecenas elementum ac augue sed tempor. Aliquam nec rutrum velit. Curabitur eu dapibus lectus.",
    expectedResult: "ipsum",
    task: "get a word 'ipsum'",
    possibleAnswer: "ipsum",
    difficulty: 1,
    id: 0,
  },
  {
    text: "Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget nisi nec metus dignissim ultrices et a lectus. Morbi nibh est, tempor sed feugiat nec, tristique eu augue. Suspendisse lobortis non nulla in porttitor. Morbi a fermentum dolor, ut tempus diam. Aliquam molestie, enim at maximus feugiat, risus erat hendrerit dui, at porta erat enim ut massa. Maecenas elementum ac augue sed tempor. Aliquam nec rutrum velit. Curabitur eu dapibus lectus.",
    expectedResult: "L",
    task: "get first UPPERCASE letter",
    possibleAnswer: "[A-Z]",
    difficulty: 1,
    id: 1,
  },
  {
    text: "Lorem ipsum ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget nisi nec metus dignissim ultrices et a lectus. Morbi nibh est, tempor sed feugiat nec, tristique eu augue. Suspendisse lobortis non nulla in porttitor. Morbi a fermentum dolor, ut tempus diam. Aliquam molestie, enim at maximus feugiat, risus erat hendrerit dui, at porta erat enim ut massa. Maecenas elementum ac augue sed tempor. Aliquam nec rutrum velit. Curabitur eu dapibus lectus.",
    expectedResult: "LMMSMAMAC",
    task: "get all UPPERCASE letters",
    possibleAnswer: "[A-Z]/g",
    difficulty: 1,
    id: 2,
  },
  {
    text: "Lorem ipsumLLLL LLLL LLL sLLLLLLLLL ipsum dolor sit amet, consectetur adipiscing elit.",
    expectedResult: "oremipsumipsumd",
    task: "get all LOWERCASE letters",
    possibleAnswer: "[a-z]/g",
    difficulty: 1,
    id: 3,
  },
  {
    text: "Lorem ipsumLLLL LLLL LLL sLLLLLLLLL ipsum dolor sit amet, consectetur adipiscing elit.",
    expectedResult: "",
    task: "get all letters by using flag 'i'",
    possibleAnswer: "[a-z]/g",
    difficulty: 1,
    id: 4,
  },
  {
    text: "+1(555)234-56-78",
    expectedResult: "",
    task: "get all digits",
    possibleAnswer: "[0-9]/g",
    difficulty: 1,
    id: 5,
  },
  {
    text: "1,22,333,4444,55555,666666,7777777",
    expectedResult: "",
    task: "get first digit by using \\d",
    possibleAnswer: "\\d/m",
    difficulty: 1,
    id: 6,
  },
  {
    text: "1,22,333,4444,55555,666666,7777777",
    expectedResult: "",
    task: "get numbers",
    possibleAnswer: "\\d+/m",
    difficulty: 1,
    id: 7,
  },
  {
    text: "10 -2 -13 -2222 999",
    expectedResult: "-2|-13|-2222",
    task: "get only negative numbers",
    possibleAnswer: "-\\d*/g",
    difficulty: 2,
    id: 8,
  },
  {
    text: "Uppercase\r\nlowercase\r\nAgain\r\nUppercase\r\nnot",
    expectedResult: "Uppercase|Again|Uppercase",
    task: "get first word of each line if first symbol is not Uppercase",
    possibleAnswer: "^[A-Z][\\w]+/gm",
    difficulty: 3,
    id: 9,
  },
  {
    text: "-10\n10\n-32\n23\n-2\n0\n-5\n5",
    expectedResult: "10|23|5",
    task: "get only positive numbers",
    possibleAnswer: "/^[1-9]+[0-9]*/gm",
    difficulty: 4,
    id: 10,
  },
  {
    text: "213.12 123,5 32.23 33 12 1 0",
    expectedResult: "213.12|32.23",
    task: "get only positive float numbers",
    possibleAnswer: "\\d+[.]\\d+/g",
    difficulty: 3,
    id: 11,
  },
  {
    text: "",
    expectedResult: "",
    task: "get only integer numbers(substitute negative)",
    possibleAnswer: "/\\d*[.]\\d*/gm",
    difficulty: 3,
    id: 12,
  },
  {
    text: "U+2192, UNITED, InvalidUnicode, U+25B6, U+2794, U-222C, U+279C, U+279D",
    expectedResult: "U+2192|U+25B6|U+2794|U+279C|U+279D",
    task: "get all unicode symbols",
    possibleAnswer: "U[+][A-Z0-9]{4}/gi",
    difficulty: 5,
    id: 13,
  },
  {
    text: "first line\r\nsecond line\r\nthird line\r\nline fourth\r\nfifth line",
    expectedResult:
      "first line\r\nsecond line\r\nthird line\r\nline fourth\r\nfifth ",
    task: "substitute last word 'line'",
    possibleAnswer: "line$/g",
    difficulty: 3,
    id: 14,
  },
  {
    text: "first line\r\nsecond line\r\nthird line\r\nline fourth\r\nfifth line",
    expectedResult: "first \nsecond \nthird \nline fourth\nfifth ",
    task: "substitute word 'line' at the end of each row",
    possibleAnswer: "line$/gm",
    difficulty: 3,
    id: 15,
  },
  {
    text:
      "<!DOCTYPE html>\r\n" +
      '<html lang="en">\r\n' +
      "<head>\r\n" +
      '    <meta charset="UTF-8" />\r\n' +
      '    <meta http-equiv="X-UA-Compatible" content="IE=edge" />\r\n' +
      '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\r\n' +
      "    <title>Document</title>\r\n" +
      "</head>\r\n" +
      "<body>\r\n" +
      "    <section>\r\n" +
      "    <p>Paragraph 1</p>\r\n" +
      "    </section>\r\n" +
      "    <section>\r\n" +
      "    <p>Paragraph 2</p>\r\n" +
      "    </section>\r\n" +
      "    <section>\r\n" +
      "    <p>Paragraph 3</p>\r\n" +
      "    </section>\r\n" +
      "</body>\r\n" +
      "</html>",
    expectedResult: "set of p`s",
    task: "get all tags 'p' with inside text",
    possibleAnswer: "/<p>(.*)<\\/p>/gm",
    difficulty: 3,
    id: 16,
  },
  {
    text:
      "{\r\n" +
      '"circleG": {"radius":5,"size":2,"color":"green","fill":false},\r\n' +
      '"circleR": {"radius":15,"size":8,"color":"red","fill":true},\r\n' +
      '"circleB": {"radius":2,"size":1,"color":"blue","fill":false},\r\n' +
      '"circleP": {"radius":7,"size":7,"color":"purple","fill":false}\r\n' +
      "}",
    expectedResult: "",
    task: 'get all keys "radius" and their values',
    possibleAnswer: '/"radius":\\d+,/gm',
    difficulty: 3,
    id: 17,
  },
  {
    text: "label\r\ntable\r\nAnabel\r\nMabel\r\nIzabel",
    expectedResult: "",
    task: ".",
    possibleAnswer: ".+abel/g",
    difficulty: 3,
    id: 18,
  },
  {
    text: "level\nqwerty\nurban\nbabel\neiffel",
    expectedResult: "",
    task: "get all words",
    possibleAnswer: "\\w*/gm",
    difficulty: 3,
    id: 19,
  },
  {
    text: "level 1st qwerty word1 word2 urban l33tspeak babel eiffel best666",
    expectedResult:
      "level 1st qwerty word word urban l33tspeak babel eiffel best",
    task: "substitute all digits AT THE END of each word",
    possibleAnswer: "\\d*\\b/mg",
    difficulty: 3,
    id: 20,
  },
  {
    text: "level\nqwerty\nurban\nbabel\neiffel",
    expectedResult: "levelqwertyurbanbabeleiffel",
    task: "substitute all line endings",
    possibleAnswer: "\\n/gm",
    difficulty: 3,
    id: 21,
  },
  {
    text: "level\nqwerty\nurban\nbabel\neiffel",
    expectedResult: "",
    task: "get all words which end with 'el'",
    possibleAnswer: "\\w*el\\b/gm",
    difficulty: 3,
    id: 22,
  },
  {
    text: "row 1, \r\n  row 2!",
    expectedResult: "row1,row2!",
    task: "substitute all spaces and line endings",
    possibleAnswer: "\\s/gm",
    difficulty: 3,
    id: 23,
  },
  {
    text: "row 1, \r\n  row 2!",
    expectedResult: "r|o|w|1|,|r|o|w|2|!",
    task: "get all symbols accept space and line ending",
    possibleAnswer: "\\S/gm",
    difficulty: 3,
    id: 24,
  },
  {
    text: `"Мама",
    "авТо",
    "гриБ",
    'Яблоко', 'яБлоко', 'ябЛоко', 'яблОко', 'яблоКо', 'яблокО'"Три богатыря""ГТО""стриж""агент007"`,
    expectedResult: "",
    task: "get all words, that has 1 Uppercase letter in any placy of the word",
    possibleAnswer:
      "/(?>[А-Я{1}][а-я]+|[а-я]+[А-Я{1}][а-я{*}]+|[а-я]+[А-Я])(?! )/gm",
    difficulty: 8,
    id: 24,
  },
];

console.log(
  array.map((el) => {
    return { ...el, functionName: "match" };
  })
);
