<template>
  <div class="payment-add">
    <div>
      <h1 class="text-h2 text-left mb-12 mt-8">
        Add new payment in {{ $route.params.category }}
      </h1>
      <formPaymentAdd :payment="payment" />
    </div>
  </div>
</template>

<script>
import formPaymentAdd from "@/components/formPaymentAdd.vue";
import { mapGetters } from "vuex";
export default {
  name: "formPaymentAddView",
  components: {
    formPaymentAdd,
  },
  data() {
    return {
      payment: {},
    };
  },
  computed: {
    ...mapGetters(["getPaymentsList"]),
  },
  methods: {
    getLinkParams() {
      if (location.search) {
        let params = new URLSearchParams(location.search);
        if (params.get("value")) {
          this.payment.value = +params.get("value");
        }
      }
      if (this.$route.params.category) {
        this.payment.category = this.$route.params.category;
      }
    },
  },
  created() {
    this.getLinkParams();
  },
};
</script>
<style lang="scss" scoped>
.title {
  font-size: 44px;
  text-align: left;
}
.payment-add {
  display: flex;
}
</style>