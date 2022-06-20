<template>
  <v-pagination
    :value="current"
    :length="amount"
    :total-visible="6"
    @input="onClick($event)"
  ></v-pagination>
</template>

<script>
export default {
  name: "paginationModule",
  props: {
    length: Number,
    elementsOnPage: Number,
    current: Number,
  },
  computed: {
    amount() {
      return Math.ceil(this.length / this.elementsOnPage);
    },
  },
  methods: {
    onClick(e) {
      this.$emit("changePage", e);
    },
  },
};
</script>