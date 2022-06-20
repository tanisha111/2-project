<template>
  <v-form @submit.prevent="submitFunc">
    <v-container>
      <v-row>
        <v-col cols="6" v-if="!idProp">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="true"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="computedDateFormatted"
                label="Date"
                prepend-icon="mdi-calendar"
                v-on="on"
                v-bind="attrs"
                readonly
                outlined
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col :cols="checkCols(idProp)">
          <v-text-field
            class="mt-0 pt-0"
            v-model.number="value"
            label="Payment value"
            required
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="category"
            :items="categoryList"
            label="Choose tour category"
            outlined
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
    <br />
    <v-btn v-if="idProp" type="submit" color="primary" large dark>
      <span class="mr-1">Save</span>
      <v-icon>mdi-content-save-outline</v-icon>
    </v-btn>
    <v-btn v-else type="submit" color="primary" large dark>
      <span class="mr-1">Add cost</span>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-form>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "formPaymentAdd",
  props: {
    payment: {
      type: Object,
    },
  },
  data() {
    return {
      category: "",
      value: null,
      date: null,
      submitFunc: this.addPaymentData,
      idProp: null,
      menu: false,
    };
  },
  watch: {
    payment: {
      handler: function (newVal, oldVal) {
        console.log(newVal, oldVal);
        this.setNewDataAndDoAction();
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters(["getCategoryList", "getDataLoaded", "getCategoriesLoaded"]),
    computedDateFormatted() {
      return this.convertDate(this.date);
    },
    categoryList() {
      return this.getCategoryList;
    },
    categoriesLoaded() {
      return this.getCategoriesLoaded;
    },
    paymentsLoaded() {
      return this.getDataLoaded;
    },
    getCurrentDate() {
      const today = new Date();
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      const currentDate = new Intl.DateTimeFormat("ru-RU", options).format(
        today
      );
      return currentDate;
    },
  },
  methods: {
    ...mapMutations(["addDataToPaymentsList", "setPaymentData", "addDiagData"]),
    convertDate(date) {
      if (date) {
        let dateArr = date.split("-");
        if (+dateArr[1] < 10) {
          return `${dateArr[2]}.0${+dateArr[1]}.${dateArr[0]}`;
        }
        return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;
      }
      return this.getCurrentDate;
    },
    checkCols(id) {
      if (id) {
        return 12;
      }
      return 6;
    },
    addPaymentData() {
      const data = {
        date: this.convertDate(this.date),
        category: this.category,
        value: this.value,
      };
      this.addDataToPaymentsList(data);
      this.addDiagData(data);
    },
    setNewDataAndDoAction() {
      this.category = this.payment.category;
      this.value = this.payment.value;
      if (this.payment?.id) {
        this.submitFunc = this.editPayment;
        this.idProp = this.payment.id;
        return;
      }
      this.addPaymentData();
    },
    editPayment() {
      const paymentData = {
        id: +this.idProp,
        category: this.category,
        value: this.value,
      };
      this.setPaymentData(paymentData);
      this.$store.dispatch("updateDiagData");
    },
  },
  async created() {
    if (!this.paymentsLoaded) {
      await this.$store.dispatch("fetchData");
    }
    if (!this.categoriesLoaded) {
      await this.$store.dispatch("fetchCategoryList");
    }
    if (this.payment) {
      await this.setNewDataAndDoAction();
    }
  },
};
</script>

<style scoped lang="scss">
form {
  max-width: 400px;
  text-align: right;
}
</style>