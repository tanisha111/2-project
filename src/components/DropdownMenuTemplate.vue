<template>
  <div class="dropdown" v-if="shown" :style="styles">
    <ul>
      <li
        v-for="item in items"
        :key="item.text"
        class="dropdown__item"
        @click="onClick(item)"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DropdownMenu",
  data() {
    return {
      shown: false,
      items: [],
      xPos: 0,
      yPos: 0,
    };
  },
  computed: {
    styles() {
      return {
        top: `${this.yPos - 11}px`,
        left: `${this.xPos + 30}px`,
      };
    },
  },
  methods: {
    onClick(item) {
      item.action();
    },
    onShow({ items, caller }) {
      this.items = items;
      this.shown = true;
      this.setPostion(caller);
    },
    onHide() {
      this.shown = false;
      this.items = [];
    },
    setPostion(caller) {
      const pos = caller.getBoundingClientRect();
      this.xPos = pos.left;
      this.yPos = pos.top;
    },
  },
  mounted() {
    this.$dropdownMenu.EventBus.$on("open", this.onShow);
    this.$dropdownMenu.EventBus.$on("close", this.onHide);
  },
  beforeDestroy() {
    this.$dropdownMenu.EventBus.$off("open", this.onShow);
    this.$dropdownMenu.EventBus.$off("close", this.onHide);
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  position: absolute;
  background: #fff;
  font-size: 14px;
  padding: 10px;
  text-align: left;
  border-radius: 3px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  &::before {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    border-style: solid;
    border-width: 8px 10px 8px 0;
    border-color: transparent #ffffff transparent transparent;
    left: -5px;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  &__item {
    cursor: pointer;
    &:hover {
      color: #0a58ca;
    }
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
}
</style>