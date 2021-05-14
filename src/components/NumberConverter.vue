<template>
  <div class="number-input">
    <label for="number">Enter a number</label>
    <input type="text" id="number" name="number" v-model="number">
    <p>{{ numberWithCommas }}</p>
    <p v-if="number.length !== 0">{{ convertedNumber }}</p>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'NumberConverter',
  setup: () => {
    const number = ref('');

    const numberWithCommas = computed(() => {
      // TODO get region dynamically
      return number.value ? new Intl.NumberFormat().format(parseInt(number.value)) : '';
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
        }

        const romajiKeys = Object.keys(romaji).map((e) => parseInt(e));

        // TODO
        // if (hundredMillionsPlace.value) {
          
        // }

        if (tenMillionsPlace.value) {
          const tenMillionsPlaceValue = romajiKeys.find((e) => e === tenMillionsPlace.value) || -1;

          if (tenMillionsPlaceValue === 1) {
            converted.push(romaji[16]);
          } else if (romaji[tenMillionsPlaceValue] === 'san') {
            converted.push(romaji[tenMillionsPlaceValue], romaji[17]);
          } else if (romaji[tenMillionsPlaceValue] === 'hachi') {
            converted.push(romaji[18], romaji[16]);
          } else {
            converted.push(romaji[tenMillionsPlaceValue], romaji[16]);
          }
        }

        if (millionsPlace.value) {
          const millionsPlaceValue = romajiKeys.find((e) => e === millionsPlace.value) || -1;

          if (millionsPlaceValue === 1) {
            converted.push(romaji[11]);
          } else if (millionsPlaceValue && hundredThousandsPlace.value === 0) {
            converted.push(romaji[millionsPlaceValue], romaji[11], romaji[20])
          } else if (romaji[millionsPlaceValue] === 'san') {
            converted.push(romaji[millionsPlaceValue], romaji[12]);
          } else if (romaji[millionsPlaceValue] === 'roku') {
            converted.push(romaji[15], romaji[13]);
          } else if (romaji[millionsPlaceValue] === 'hachi') {
            converted.push(romaji[19], romaji[13]);
          } else {
            converted.push(romaji[millionsPlaceValue], romaji[11]);
          }
        };

        if (hundredThousandsPlace.value) {
          const hundredThousandsPlaceValue = romajiKeys.find((e) => e === hundredThousandsPlace.value) || -1;

          if (hundredThousandsPlaceValue === 1) {
            converted.push(romaji[10]);
          } else if (hundredThousandsPlaceValue && tenThousandsPlace.value === 0) {
            converted.push(romaji[hundredThousandsPlaceValue], romaji[10], romaji[20])
          } else {
            converted.push(romaji[hundredThousandsPlaceValue], romaji[10])
          }
        };

        if (tenThousandsPlace.value) {
          const tenThousandsPlaceValue = romajiKeys.find((e) => e === tenThousandsPlace.value) || -1;

          converted.push(romaji[tenThousandsPlaceValue], romaji[20]);
        };

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

        if (tensPlace.value) {
          const tensPlaceValue = romajiKeys.find((e) => e === tensPlace.value) || -1;

          if (tensPlaceValue === 1) {
            converted.push(romaji[10]);
          } else {
            converted.push(romaji[tensPlaceValue], romaji[10]);
          }
        };

        if (onesPlace.value) {
          const onesPlaceValue = romajiKeys.find((e) => e === onesPlace.value) || -1;

          converted.push(romaji[onesPlaceValue]);
        };

        return converted.join('・');
      }
    });


    return { number, numberWithCommas, convertedNumber, onesPlace }
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
  font-size: 3em;
}
</style>
