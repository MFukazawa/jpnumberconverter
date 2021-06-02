<template>
  <div class="number-input">
    <label for="number">Enter a number</label>
    <input
      type="text"
      id="number"
      name="number"
      v-model="number"
      @input="cleanNumber"
    />
    <!-- TODO don't display if 0 -->
    <div class="formatted-container">
      <p class="formatted-number">{{ numberWithCommas }}</p>
      <template v-for="(digit, index) in units" :key="index">
        <!-- TODO add increased width every third number to cover comma -->
        <div v-if="number.length > index + 1" class="unit" :style="{ width: (index + 1) * 1.75 + 'rem' }">{{ digit }}</div>
      </template>
    </div>
    <p v-if="parseInt(number) !== 0">
      <span
        v-for="number in romajiArrayNumber"
        :key="number.index"
        :class="{ 'large-unit': isLargeUnit(number) }"
        >{{ number }}</span
      >
    </p>
  </div>
</template>

<script lang="ts">
  import { ref, computed, defineComponent } from 'vue';
  import * as numbers from '../models/numbers';
  import {
    ichi,
    ni,
    san,
    yon,
    go,
    roku,
    nana,
    hachi,
    kyuu,
    juu,
    hyaku,
    byaku,
    ppyaku,
    ro,
    sen,
    zen,
    has,
    ha,
    man,
    oku,
    is
  } from '../models/numbers';

  export default defineComponent({
    name: 'NumberConverter',
    setup: () => {
      const number = ref('');

      const units = ref([
        'juu',
        'hyaku',
        'sen',
        'man',
        'juu man',
        'hyaku man',
        'sen man',
        'oku',
        'juu oku',
        'hyaku oku',
        'sen oku',
        'chou',
      ]);

      const cleanNumber = () => {
        number.value = number.value.replace(/\D/g, '');
      };

      const numberWithCommas = computed(() => {
        return numbers.numberWithCommas(number.value);
      });

      const numberFormatted = computed(() => {
        return numbers.numberFormatted(number.value);
      });

      const romajiArrayNumber = computed(() => {
        if (numberFormatted.value === NaN || numberFormatted.value === -1) {
          return 'Please enter a number';
        } else {
          const numberArray = numbers.numberArray(numberFormatted.value);

          const [
            onesPlace,
            tensPlace,
            hundredsPlace,
            thousandsPlace,
            tenThousandsPlace,
            hundredThousandsPlace,
            millionsPlace,
            tenMillionsPlace,
            hundredMillionsPlace,
            billionsPlace,
            tenBillionsPlace,
          ] = numberArray.reverse();

          let romajiArray = [] as Array<string>;

          const romaji: string[] = [
            'zero',
            'ichi',
            'ni',
            'san',
            'yon',
            'go',
            'roku',
            'nana',
            'hachi',
            'kyuu',
            'juu',
            'hyaku', // 11
            'byaku', // 12
            'ppyaku', // 13
            'ro', // 14
            'sen', // 15
            'zen', // 16
            'has', // 17
            'ha', // 18
            'man', // 19
            'oku', // 20
            'is', // 21
          ];

          // const romajiKeys = Object.keys(romaji).map((e) => parseInt(e));

          // 11 digit hyaku oku
          // if (tenBillionsPlace) {
          //   if (tenBillionsPlace === 1) {
          //     romajiArray.push(hyaku, oku);
          //   } else if (tenBillionsPlace) {
          //     romajiArray.push(romaji[tenBillionsPlace], hyaku)
          //   }
          // }

          // 10 digit juu oku
          // TODO fix for 1234321223
          if (billionsPlace) {
            if (billionsPlace === 1 && hundredMillionsPlace === 0) {
              romajiArray.push(juu, oku);
            } else if (billionsPlace !== 1 && hundredMillionsPlace === 0) {
              romajiArray.push(
                romaji[billionsPlace],
                juu,
                oku
              );
            } else if (billionsPlace === 1 && hundredMillionsPlace !== 0) {
              romajiArray.push(juu)
            } else {
              romajiArray.push(romaji[billionsPlace], juu);
            }
          }

          // 9 digit oku
          if (hundredMillionsPlace) {
            romajiArray.push(romaji[hundredMillionsPlace], oku);
          }

          // 8 digit sen man
          if (tenMillionsPlace) {
            if (tenMillionsPlace === 1 && millionsPlace === 0) {
              romajiArray.push(is, sen);
            } else if (hundredMillionsPlace && tenMillionsPlace === 1) {
              romajiArray.push(is, sen);
            } else if (
              tenMillionsPlace === 1 &&
              millionsPlace !== 0
            ) {
              romajiArray.push(sen);
            } else if (romaji[tenMillionsPlace] === san) {
              romajiArray.push(romaji[tenMillionsPlace], zen);
            } else if (romaji[tenMillionsPlace] === hachi) {
              romajiArray.push(has, sen);
            } else {
              romajiArray.push(romaji[tenMillionsPlace], sen);
            }
          }

          // 7 digit hyaku man
          if (
            millionsPlace ||
            (tenMillionsPlace && millionsPlace === 0)
          ) {

            if (millionsPlace === 0) {
              romajiArray.push(man);
            }
            // hyaku man
            else if (
              millionsPlace === 1 &&
              hundredThousandsPlace === 0
            ) {
              romajiArray.push(hyaku, man);
            }
            // hyaku ni juu man
            else if (
              millionsPlace === 1 &&
              hundredThousandsPlace !== 0
            ) {
              romajiArray.push(hyaku);
            }
            // special reading
            else if (romaji[millionsPlace] === san) {
              romajiArray.push(romaji[millionsPlace], byaku);
            }
            // special reading
            else if (romaji[millionsPlace] === roku) {
              romajiArray.push(ro, ppyaku);
            }
            // special reading
            else if (romaji[millionsPlace] === hachi) {
              romajiArray.push(ha, ppyaku);
            } else {
              romajiArray.push(romaji[millionsPlace], hyaku);
            }
          }

          // // 6 digit juu man
          if (hundredThousandsPlace) {
            // juu
            if (hundredThousandsPlace === 1) {
              romajiArray.push(juu);
            }
            // kyuu juu
            else {
              romajiArray.push(romaji[hundredThousandsPlace], juu);
            }
          }

          // // 5 digit man -> ここから「いっせん」
          if (
            tenThousandsPlace ||
            (hundredThousandsPlace && tenThousandsPlace === 0)
          ) {
            // yon man
            if (tenThousandsPlace !== 0) {
              romajiArray.push(romaji[tenThousandsPlace], man);
            } else {
              // man
              romajiArray.push(man);
            }
          }

          // // 4 digit sen
          if (thousandsPlace) {
            if (tenThousandsPlace && thousandsPlace === 1) {
              romajiArray.push(is, sen);
            } else if (thousandsPlace === 1) {
              romajiArray.push(sen);
            } else if (romaji[thousandsPlace] === san) {
              romajiArray.push(romaji[thousandsPlace], zen);
            } else if (romaji[thousandsPlace] === hachi) {
              romajiArray.push(has, sen);
            } else {
              romajiArray.push(romaji[thousandsPlace], sen);
            }
          }

          // // 3 digit hyaku
          if (hundredsPlace) {
            if (hundredsPlace === 1) {
              romajiArray.push(hyaku);
            } else if (romaji[hundredsPlace] === san) {
              romajiArray.push(romaji[hundredsPlace], byaku);
            } else if (romaji[hundredsPlace] === roku) {
              romajiArray.push(ro, ppyaku);
            } else if (romaji[hundredsPlace] === hachi) {
              romajiArray.push(ha, ppyaku);
            } else {
              romajiArray.push(romaji[hundredsPlace], hyaku);
            }
          }

          // 2 digit juu
          if (tensPlace) {
            if (tensPlace === 1) {
              romajiArray.push(juu);
            } else {
              romajiArray.push(romaji[tensPlace], juu);
            }
          }

          // 1 digit 1-9
          if (onesPlace) {
            romajiArray.push(romaji[onesPlace]);
          }

          console.log(romajiArray);

          return romajiArray;
        }
      });

      const isLargeUnit = (value: string) => {
        // TODO convert to class
        const largeUnits = [
          'oku',
          'man',
          'sen',
          'zen',
          'hyaku',
          'byaku',
          'ppyaku',
          'juu',
        ];

        return largeUnits.includes(value);
      };

      return {
        number,
        numberWithCommas,
        romajiArrayNumber,
        isLargeUnit,
        cleanNumber,
        units
      };
    },
  });
</script>

<style scoped>
  input[type='text'] {
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

  .formatted-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  p.formatted-number {
    margin-bottom: 0;
  }

  .unit {
    padding: 0 15px;
    border-left: 1px solid #000;
    border-bottom: 1px solid #000;
  }
</style>
