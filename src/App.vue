<template>
  <h1>Japan Number Converter</h1>
  <p>Enter a number to convert to an easy to read Japanese number format!</p>
  <number-converter />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NumberConverter from './components/NumberConverter.vue'

export default defineComponent({
  name: 'App',
  components: {
    NumberConverter
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.number-input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
