<template>
  <div class="modal">
    <div class="modal-body">
      <button class="btn-close" @click="onCloseClick">x</button>
      <div class="title">{{ settings.title }}</div>
      <div class="content">
        <component
          :is="settings.component"
          :payment="settings.props ? settings.props.item : null"
        />
      </div>
    </div>
    <div class="modal-backdrop"></div>
  </div>
</template>
<script>
export default {
  name: "ModalWindow",
  components: {
    formPaymentAdd: () => import("@/components/formPaymentAdd.vue"),
    formCategoryAdd: () => import("@/components/formCategoryAdd.vue"),
  },
  props: {
    settings: Object,
  },
  methods: {
    onCloseClick() {
      this.$modal.hide();
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .title {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 30px;
  }
  &-body {
    min-width: 384px;
    position: relative;
    z-index: 1;
    background: white;
    padding: 30px;
    border-radius: 3px;
    box-shadow: 0px 0px 15px rgb(222 222 222 / 50%);
  }
  &-backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
  }
  .btn-close {
    padding: 10px;
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: none;
    font-weight: 600;
    line-height: 0.5;
    cursor: pointer;
  }
}
</style>
