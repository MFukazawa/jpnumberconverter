// const numberWithCommas = computed(() => {
//   // TODO get region dynamically
//   return number.value ? new Intl.NumberFormat().format(parseInt(number.value)) : '';
// });

export const numberWithCommas = (number: string) =>  {
  return number ? new Intl.NumberFormat().format(parseInt(number)) : '';
}
