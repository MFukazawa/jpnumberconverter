<template>
  <div class="number-input">
    <label for="number">Enter a number</label>
    <input type="text" id="number" name="number" v-model="number">
    <p v-if="number.length !== 0">{{ convertedNumber }}</p>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'NumberConverter',
  setup: () => {
    const number = ref('');

    const numberFormatted = computed(() => {
      const numbers = /[0-9]+$/;
      const containsOnlyNumbers = numbers.test(number.value);

      // TODO get region dynamically
      return containsOnlyNumbers ? new Intl.NumberFormat().format(parseInt(number.value)) : -1
    });

    const numberArray = computed(() => {
      return numberFormatted.value.toString().split('').map((e) => parseInt(e));
    })

    const onesPlace = computed(() => {
      return numberArray.value[numberArray.value.length - 1];
    });

    const tensPlace = computed(() => {
      return numberArray.value[numberArray.value.length - 2];
    });

    const hundredsPlace = computed(() => {
      return numberArray.value[numberArray.value.length - 3];
    })

    const convertedNumber = computed(() => {
      if (numberFormatted.value === 'NaN' || numberFormatted.value === -1) {
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
          15: 'ro'
        }

        const romajiKeys = Object.keys(romaji).map((e) => parseInt(e));

        if (hundredsPlace.value) {
          const hundredsPlaceValue = romajiKeys.find((e) => e === hundredsPlace.value) || -1;

          if (hundredsPlaceValue === 1) {
            converted.push(romaji[11]);
          } else if (romaji[hundredsPlaceValue] === 'san') {
            converted.push(romaji[hundredsPlaceValue], romaji[12]);
          } else if (romaji[hundredsPlaceValue] === 'roku') {
            converted.push(romaji[15], romaji[13]);
          }
          else {
            converted.push(romaji[hundredsPlaceValue], romaji[11]);
          }
        }

        if (tensPlace.value) {
          const tensPlaceValue = romajiKeys.find((e) => e === tensPlace.value) || -1;

          if (tensPlaceValue === 1) {
            converted.push(romaji[10]);
          } else {
            // TODO add 40 series with 'yon'
            // TODO add 70 series with 'nana'
            converted.push(romaji[tensPlaceValue], romaji[10]);
          }
        };

        if (onesPlace.value) {
          const onesPlaceValue = romajiKeys.find((e) => e === onesPlace.value) || -1;

          converted.push(romaji[onesPlaceValue]);
        };

        return converted.join('-');
      }
    });


    return { number, convertedNumber, onesPlace }
  }
})
</script>

<style scoped>

</style>
