<template>
  <div>
    <button :class="classBtn" @click="changeVisiability" class="btn">
      <slot></slot>
      <span>{{ icon }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "formVisiabilityButton",
  props: {
    show: {
      type: Boolean,
      default: () => false,
    },
    classBtn: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      icon: "+",
    };
  },
  methods: {
    changeIcon(visibility) {
      if (visibility) {
        this.icon = "-";
      } else {
        this.icon = "+";
      }
    },
    changeVisiability() {
      this.changeIcon(!this.show);
      this.$emit("changeVisiability", !this.show);
    },
  },
};
</script>

<style scoped lang="scss">
</style>