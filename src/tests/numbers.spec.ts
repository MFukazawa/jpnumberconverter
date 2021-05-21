import * as numbers from '../models/numbers';

test("Successful number conversion", () => {
  expect(numbers.numberWithCommas('123456')).toStrictEqual('123,456')
});