<template>
  <div id="app">
    <nav>
      <router-link to="/">Dashboard</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
    <transition name="fade">
      <ModalWindow :settings="settings" v-if="modalShow" />
    </transition>
    <transition name="fade">
      <DropdownMenu />
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modalShow: false,
      settings: {},
    };
  },
  components: {
    ModalWindow: () => import("@/components/ModalWindow.vue"),
    DropdownMenu: () => import("@/components/DropdownMenuTemplate.vue"),
  },
  methods: {
    onShow(data) {
      this.modalShow = true;
      this.settings = data;
    },
    onHide() {
      this.modalShow = false;
      this.settings = {};
    },
  },
  mounted() {
    this.$modal.EventBus.$on("show", this.onShow);
    this.$modal.EventBus.$on("hide", this.onHide);
  },
  beforeDestroy() {
    this.$modal.EventBus.$off("show", this.onShow);
    this.$modal.EventBus.$off("hide", this.onHide);
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a {
  &:hover {
    color: #0a58ca;
  }
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #0a58ca;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
