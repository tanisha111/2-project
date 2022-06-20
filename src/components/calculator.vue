<template>
  <div class="calculator">
    <input type="number" class="calculator__input" v-model.number="operand1" />
    <input type="number" class="calculator__input" v-model.number="operand2" />
    = {{ result }}<br />
    <div class="error" v-show="error != ''">
      <strong>Внимание!</strong> {{ error }}
    </div>
    <br />
    <div class="calculator__keyboard">
      <button
        v-for="operator in operators"
        :key="operator"
        @click="calculator(operator)"
      >
        {{ operator }}
      </button>
    </div>
    <br />
    <label>
      <input type="checkbox" name="show_keyboard" v-model="screenKeyboard" />
      Показать экранную клавиатуру
    </label>
    <div v-show="screenKeyboard" class="calculator__screen">
      <br />
      <div class="calculator__buttons">
        <button
          v-for="keyboardKey in keysArray"
          @click="toOperand('add', keyboardKey)"
          :key="keyboardKey"
        >
          {{ keyboardKey }}
        </button>
        <button @click="toOperand('remove')">&larr;</button>
      </div>
      <br />
      <div class="calculator__radio">
        <label>
          <input type="radio" value="operand1" v-model="picked" />
          Операнд 1
        </label>
        <label>
          <input type="radio" value="operand2" v-model="picked" />
          Операнд 2
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalcComp",
  data() {
    return {
      operand1: 0,
      operand2: 0,
      picked: "operand1",
      result: 0,
      operators: ["+", "-", "/", "*", "^"],
      error: "",
      screenKeyboard: false,
      keysArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  },
  methods: {
    calculator(sighn = "+") {
      this.error = "";
      switch (sighn) {
        case "+":
          this.result = this.operand1 + this.operand2;
          break;
        case "-":
          this.result = this.operand1 - this.operand2;
          break;
        case "/":
          if (this.operand2 != 0) {
            this.result = this.operand1 / this.operand2;
          } else {
            this.error = "Делить на ноль нелья!";
          }
          break;
        case "*":
          this.result = this.operand1 * this.operand2;
          break;
        case "^":
          this.result = Math.pow(this.operand1, this.operand2);
          break;
        default:
          this.result = 0;
      }
    },
    numberToArr(number) {
      return String(number).split("");
    },
    arrToNumber(array) {
      return Number(array.join(""));
    },
    toOperand(action, key) {
      let numberArray = this.numberToArr(this[this.picked]);
      switch (action) {
        case "add":
          numberArray.push(key);
          break;
        default:
          numberArray.pop();
      }
      this[this.picked] = this.arrToNumber(numberArray);
    },
  },
};
</script>

<style scoped lang="scss">
</style>