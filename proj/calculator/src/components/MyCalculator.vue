<template>
  <div class="mycalculator">
    <div class="display">{{ currentInput }}</div>
    <button
      v-for="button in buttons"
      :key="button"
      @click="onButtonClick(button)"
    >
      {{ button }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentInput: "",
      buttons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "+", "-", "*", "/", "="],
    };
  },
  methods: {
    onButtonClick(button) {
      if (button === "=") {
        this.calculateResult();
      } else {
        this.currentInput += button;
      }
    },
    calculateResult() {
      try {
        this.currentInput = eval(this.currentInput);
      } catch (e) {
        this.currentInput = "Error";
      }
    },
  },
};
</script>

<style></style>
