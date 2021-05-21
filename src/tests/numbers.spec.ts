import * as numbers from '../models/numbers';

test("Successful number conversion", () => {
  expect(numbers.numberWithCommas('123456')).toStrictEqual('123,456');
});

test("Successful number format clean", () => {
  expect(numbers.numberFormatted('123456')).toStrictEqual(123456);
});

test("Successful number array creation", () => {
  expect(numbers.numberArray(123)).toStrictEqual([1, 2, 3]);
});