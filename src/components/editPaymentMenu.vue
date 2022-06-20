<template>
  <div>
    <router-link :to="{ name: 'editpayment', params: { id: paymentId + 1 } }"
      >Edit</router-link
    >
    <a href="#" @click.prevent="removePayment">Remove</a>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "editPaymentMenu",
  props: {
    paymentId: {
      type: Number,
    },
  },
  methods: {
    ...mapMutations(["removeDataFromPaymentsList"]),
    removePayment() {
      this.removeDataFromPaymentsList(this.paymentId);
    },
  },
};
</script>

<style scoped lang="scss">
div {
  text-align: left;
}
a {
  font-size: 14px;
  text-decoration: none;
  display: block;
  & + a {
    margin-top: 5px;
  }
}
</style>