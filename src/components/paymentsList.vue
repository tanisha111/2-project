<template>
  <v-layout column>
    <v-simple-table class="mb-6">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">#</th>
            <th class="text-center">Date</th>
            <th class="text-center">Category</th>
            <th class="text-center">Value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(payment, i) in payments" :key="i">
            <td>{{ elNumber + i + 1 }}</td>
            <td>{{ payment.date }}</td>
            <td>{{ payment.category }}</td>
            <td>{{ payment.value }}</td>
            <td>
              <v-menu bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    :data-id="elNumber + i + 1"
                    dense
                    v-for="(item, j) in items"
                    :key="j"
                    @click="item.action(payment, elNumber + i + 1)"
                  >
                    <v-list-item-title class="text-body-2 font-weight-light">{{
                      item.title
                    }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <p>Total: {{ getFPV }}</p>
    <v-dialog v-model="dialog" max-width="385px">
      <v-card>
        <v-card-title class="text-h4 mb-4 font-weight-light">
          <span>Edit payment</span>
          <v-spacer></v-spacer>
          <v-btn light icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <formPaymentAdd :payment="payment" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "paymentsList",
  components: {
    formPaymentAdd: () => import("@/components/formPaymentAdd.vue"),
  },
  data() {
    return {
      payment: {},
      dialog: false,
      items: [
        {
          title: "Edit",
          action: this.editItem,
        },
        {
          title: "Remove",
          action: this.deleteItem,
        },
      ],
    };
  },
  props: {
    payments: {
      type: Array,
      default: () => [],
    },
    elementsOnPage: {
      type: Number,
    },
    currentPage: {
      type: Number,
    },
  },
  computed: {
    ...mapGetters(["getFullPaymentValue"]),
    elNumber() {
      if (this.currentPage > 1) {
        return this.elementsOnPage * this.currentPage - this.elementsOnPage;
      }
      return 0;
    },
    getFPV() {
      return this.getFullPaymentValue;
    },
  },
  methods: {
    ...mapMutations(["removeDataFromPaymentsList"]),
    editItem(item, id) {
      if (id) {
        item.id = id;
      }
      this.payment = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(payment) {
      this.removeDataFromPaymentsList(payment);
      this.$store.dispatch("updateDiagData");
    },
  },
};
</script>

<style scoped lang="scss">
table {
  width: 100%;
  border-spacing: 0;
}
th,
td {
  border-bottom: 1px solid #ced4da;
}
th {
  padding: 20px 0;
}
td {
  padding: 10px 0;
  svg {
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
    &:hover {
      opacity: 0.4;
    }
  }
}
</style>