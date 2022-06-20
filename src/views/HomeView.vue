<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <calculator />
  </div>
</template>

<script>
// @ is an alias to /src
import calculator from "@/components/calculator.vue";

export default {
  name: "HomeView",
  components: {
    calculator,
  },
};
</script>
