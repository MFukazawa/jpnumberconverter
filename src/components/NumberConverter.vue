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
      console.log(numberFormatted.value)
      return numberFormatted.value.toString().split('').map((e) => parseInt(e));
    })

    const onesPlace = computed(() => {
      return numberArray.value[numberArray.value.length - 1];
    });

    const tensPlace = computed(() => {
      return numberArray.value[numberArray.value.length - 2];
    });

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
          4: 'shi',
          5: 'go',
          6: 'roku',
          7: 'shichi',
          8: 'hachi',
          9: 'kyuu',
          10: 'juu',
        }

        const romajiKeys = Object.keys(romaji).map((e) => parseInt(e));

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

        return converted.join('-');
      }
    });


    return { number, convertedNumber, onesPlace }
  }
})
</script>

<style scoped>

</style>
