const test2 = [1, 2, 3, 4, 5];
const res = test2.sort(() => (Math.random() > 0.5 ? 1 : -1));
console.log(res);
