export const numberWithCommas = (number: string) =>  {
  return number ? new Intl.NumberFormat().format(parseInt(number)) : '';
};

export const numberFormatted = (number: string) => {
  const rounded = Math.round(parseInt(number));

  return parseInt(rounded.toString().replace(/\D/g,''));
};

export const numberArray = (number: string) => {
  return number.toString().split('').map((e) => parseInt(e));
};
