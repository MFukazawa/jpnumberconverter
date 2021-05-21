export const numberWithCommas = (number: string) =>  {
  return number ? new Intl.NumberFormat().format(parseInt(number)) : '';
};

export const numberFormatted = (number: string) => {
  const rounded = Math.round(parseInt(number));

  return parseInt(rounded.toString().replace(/\D/g,''));
};

export const numberArray = (number: number) => {
  return number.toString().split('').map((e) => parseInt(e));
};

interface Romaji {
  toString(): string;
  isUnit(): boolean;
}

// class NumberRomaji implements Romaji {
//   value: string;
//   romaji: string[] = ['zero', 'ichi'];

//   constructor(num: number) {
//     this.value = this.romaji[num];
//   }

//   toString() {
//     return this.value;
//   }
//
//   isUnit() {
//     return false;
//   }
// }

// class UnitRomaji {
//   value: string;
//   romaji: string[] = ['juu', 'hyaku', 'man'];

//   constructor(place: number) {
//     this.value = this.romaji[place];
//   }

//   toString() {
//     return this.value;
//   }

//   isUnit() {
//     return true;
//   }
// }

// const romajiArray: Romaji[] = [new NumberRomaji(2), new UnitRomaji(2), new NumberRomaji(1)];

export const zero = 'zero';
export const ichi = 'ichi';
export const ni = 'ni';
export const san = 'san';
export const yon = 'yon';
export const go = 'go';
export const roku = 'roku';
export const nana = 'nana';
export const hachi = 'hachi';
export const kyuu = 'kyuu';
export const juu = 'juu';
export const hyaku = 'hyaku'; // 11
export const byaku = 'byaku'; // 12
export const ppyaku = 'ppyaku'; // 13
export const ro = 'ro'; // 14
export const sen = 'sen'; // 15
export const zen = 'zen'; // 16
export const has = 'has'; // 17
export const ha = 'ha'; // 18
export const man = 'man'; // 19
export const oku = 'oku'; // 20
export const is = 'is'; // 21