<template>
  <div class="number-input">
    <label for="number">Enter a number</label>
    <input type="text" id="number" name="number" v-model="number">
    <!-- TODO don't display if 0 -->
    <p>{{ numberWithCommas }}</p>
    <p v-if="parseInt(number) !== 0">
      <span
        v-for="number in convertedNumber"
        :key="number.index"
        :class="{ 'large-unit': isLargeUnit(number) }"
      >{{ number }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue';
import * as numbers from '../models/numbers';

export default defineComponent({
  name: 'NumberConverter',
  setup: () => {
    const number = ref('');

    const numberWithCommas = computed(() => {
      return numbers.numberWithCommas(number.value);
    });

    const numberFormatted = computed(() => {
      const rounded = Math.round(parseInt(number.value));

      return parseInt(rounded.toString().replace(/\D/g,''));
    });

    const numberArray = computed(() => {
      return numberFormatted.value.toString().split('').map((e) => parseInt(e));
    })

    const onesPlace = computed(() => numberArray.value[numberArray.value.length - 1]);

    const tensPlace = computed(() => numberArray.value[numberArray.value.length - 2]);

    const hundredsPlace = computed(() => numberArray.value[numberArray.value.length - 3]);

    const thousandsPlace = computed(() => numberArray.value[numberArray.value.length - 4]);

    const tenThousandsPlace = computed(() => numberArray.value[numberArray.value.length - 5]);

    const hundredThousandsPlace = computed(() => numberArray.value[numberArray.value.length - 6]);

    const millionsPlace = computed(() => numberArray.value[numberArray.value.length - 7]);

    const tenMillionsPlace = computed(() => numberArray.value[numberArray.value.length - 8]);

    const hundredMillionsPlace = computed(() => numberArray.value[numberArray.value.length - 9]);

    const billionsPlace = computed(() => numberArray.value[numberArray.value.length - 10]);

    const convertedNumber = computed(() => {
      if (numberFormatted.value === NaN || numberFormatted.value === -1) {
        return 'Please enter a number'
      } else {
        let converted = [] as Array<string>;

        const romaji: {
          [index: number]: string;
        } = {
          0: 'zero',
          1: 'ichi',
          2: 'ni',
          3: 'san',
          4: 'yon',
          5: 'go',
          6: 'roku',
          7: 'nana',
          8: 'hachi',
          9: 'kyuu',
          10: 'juu',
          11: 'hyaku',
          12: 'byaku',
          13: 'ppyaku',
          14: 'yon',
          15: 'ro',
          16: 'sen',
          17: 'zen',
          18: 'has',
          19: 'ha',
          20: 'man',
          21: 'oku',
          22: 'is'
        }

        const romajiKeys = Object.keys(romaji).map((e) => parseInt(e));

        if (billionsPlace.value) {
          const billionsPlaceValue = romajiKeys.find((e) => e === billionsPlace.value) || -1;

          if (billionsPlaceValue === 1) {
           converted.push(romaji[10], romaji[21]);
          } else if (billionsPlaceValue && tenThousandsPlace.value === 0) {
            converted.push(romaji[billionsPlaceValue], romaji[10], romaji[20])
          } else {
            converted.push(romaji[billionsPlaceValue], romaji[10])
          }
        };

        // 9 digit oku
        if (hundredMillionsPlace.value) {
          const hundredMillionsPlaceValue = romajiKeys.find((e) => e === hundredMillionsPlace.value) || -1;

          if (hundredMillionsPlaceValue) {
            converted.push(romaji[hundredMillionsPlaceValue], romaji[21])
          }
        };

        // 8 digit sen man
        if (tenMillionsPlace.value) {
          const tenMillionsPlaceValue = romajiKeys.find((e) => e === tenMillionsPlace.value) || -1;

          if (tenMillionsPlaceValue === 1 && millionsPlace.value === 0) {
            converted.push(romaji[22], romaji[16]);
          } else if (tenMillionsPlaceValue === 1 && millionsPlace.value !== 0) {
            converted.push(romaji[16]);
          } else if (romaji[tenMillionsPlaceValue] === 'san') {
            converted.push(romaji[tenMillionsPlaceValue], romaji[17]);
          } else if (romaji[tenMillionsPlaceValue] === 'hachi') {
            converted.push(romaji[18], romaji[16]);
          } else {
            converted.push(romaji[tenMillionsPlaceValue], romaji[16]);
          }
        };

        // 7 digit hyaku man
        if (millionsPlace.value || tenMillionsPlace.value && millionsPlace.value === 0) {
          const millionsPlaceValue = romajiKeys.find((e) => e === millionsPlace.value) || -1;

          if (millionsPlaceValue === -1) {
            converted.push(romaji[20]);
          }
          // hyaku man
          else if (millionsPlaceValue === 1 && hundredThousandsPlace.value === 0) {
            converted.push(romaji[11], romaji[20]);
          }
          // hyaku ni juu man
          else if (millionsPlaceValue === 1 && hundredThousandsPlace.value !== 0) {
            converted.push(romaji[11], )
          }
          // special reading
          else if (romaji[millionsPlaceValue] === 'san') {
            converted.push(romaji[millionsPlaceValue], romaji[12]);
          }
          // special reading
          else if (romaji[millionsPlaceValue] === 'roku') {
            converted.push(romaji[15], romaji[13]);
          }
          // special reading
          else if (romaji[millionsPlaceValue] === 'hachi') {
            converted.push(romaji[19], romaji[13]);
          }
          else {
            converted.push(romaji[millionsPlaceValue], romaji[11]);
          }
        };

        // 6 digit juu man
        if (hundredThousandsPlace.value) {
          const hundredThousandsPlaceValue = romajiKeys.find((e) => e === hundredThousandsPlace.value) || -1;

          // juu
          if (hundredThousandsPlaceValue === 1) {
            converted.push(romaji[10]);
          }
          // kyuu juu
          else {
            converted.push(romaji[hundredThousandsPlaceValue], romaji[10])
          }
        };

        // 5 digit man
        if (tenThousandsPlace.value || hundredThousandsPlace.value && tenThousandsPlace.value === 0) {
          const tenThousandsPlaceValue = romajiKeys.find((e) => e === tenThousandsPlace.value) || -1;

          // yon man
          if (tenThousandsPlaceValue !== -1) {
            converted.push(romaji[tenThousandsPlaceValue], romaji[20]);
          } else {
            // man
            converted.push(romaji[20]);
          }
        };

        // 4 digit sen
        if (thousandsPlace.value) {
          const thousandsPlaceValue = romajiKeys.find((e) => e === thousandsPlace.value) || -1;

          if (thousandsPlaceValue === 1) {
            converted.push(romaji[16]);
          } else if (romaji[thousandsPlaceValue] === 'san') {
            converted.push(romaji[thousandsPlaceValue], romaji[17]);
          } else if (romaji[thousandsPlaceValue] === 'hachi') {
            converted.push(romaji[18], romaji[16]);
          } else {
            converted.push(romaji[thousandsPlaceValue], romaji[16]);
          }
        };

        // 3 digit hyaku
        if (hundredsPlace.value) {
          const hundredsPlaceValue = romajiKeys.find((e) => e === hundredsPlace.value) || -1;

          if (hundredsPlaceValue === 1) {
            converted.push(romaji[11]);
          } else if (romaji[hundredsPlaceValue] === 'san') {
            converted.push(romaji[hundredsPlaceValue], romaji[12]);
          } else if (romaji[hundredsPlaceValue] === 'roku') {
            converted.push(romaji[15], romaji[13]);
          } else if (romaji[hundredsPlaceValue] === 'hachi') {
            converted.push(romaji[19], romaji[13]);
          } else {
            converted.push(romaji[hundredsPlaceValue], romaji[11]);
          }
        };

        // 2 digit juu
        if (tensPlace.value) {
          const tensPlaceValue = romajiKeys.find((e) => e === tensPlace.value) || -1;

          if (tensPlaceValue === 1) {
            converted.push(romaji[10]);
          } else {
            converted.push(romaji[tensPlaceValue], romaji[10]);
          }
        };

        // 1 digit 1-9
        if (onesPlace.value) {
          const onesPlaceValue = romajiKeys.find((e) => e === onesPlace.value) || -1;

          converted.push(romaji[onesPlaceValue]);
        };

        console.log(converted)

        return converted;
      }
    });

    const isLargeUnit = (value: string) => {
      const largeUnits = ['oku', 'man', 'sen', 'zen', 'hyaku', 'byaku', 'ppyaku'];

      return largeUnits.includes(value);
    }

    return { number, numberWithCommas, convertedNumber, onesPlace, isLargeUnit }
  }
})
</script>

<style scoped>
input[type=text] {
  padding: 20px;
  font-size: 20px;
  letter-spacing: 4px;
  border-radius: 4px;
}

p {
  display: flex;
  flex-wrap: wrap;
  font-size: 3em;
}

p span {
  padding: 0 10px;
}

.large-unit {
  font-weight: bold;
}
</style>
