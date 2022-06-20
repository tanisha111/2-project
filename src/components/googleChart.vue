<template>
  <GChart
    type="PieChart"
    style="height: 500px"
    :data="chartData"
    :options="chartOptions"
  />
</template>
<script>
import { GChart } from "vue-google-charts/legacy";

export default {
  name: "GoogleChart",
  components: {
    GChart,
  },
  props: {
    chartData: {
      type: Array,
    },
  },
  data() {
    return {
      chartOptions: {
        title: "Costs by category",
        is3D: true,
      },
    };
  },
};
</script>