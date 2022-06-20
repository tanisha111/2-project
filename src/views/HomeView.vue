<template>
  <v-container>
    <h1 class="text-h2 text-left mb-12 mt-8">My personal costs</h1>
    <v-row>
      <v-col cols="4">
        <v-layout justify-start class="mb-8">
          <v-btn
            elevation="0"
            small
            class="mr-3"
            to="/add/payment/Transport?value=200"
          >
            Transport: 200$
          </v-btn>
          <v-btn
            elevation="0"
            small
            class="mr-3"
            to="/add/payment/Food?value=120"
          >
            Food: 120$
          </v-btn>
        </v-layout>
        <v-layout justify-space-between class="mb-8">
          <v-btn color="primary" large dark @click="dialog = true">
            <span class="mr-1">Add new cost</span>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn color="primary" large dark @click="dialog_snd = true">
            <span class="mr-1">Add new category</span>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-layout>

        <paymentsList
          :payments="currentPageElements"
          :currentPage="current"
          :elementsOnPage="elementsOnPage"
        />
        <paginationModule
          :current="current"
          :length="getPaymentsList.length"
          :elementsOnPage="elementsOnPage"
          @changePage="changePage"
        />
      </v-col>
      <v-col cols="6">
        <GoogleChart :chartData="diagData" />
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="385px">
      <v-card>
        <v-card-title class="text-h4 mb-4 font-weight-light">
          <span>Add new cost</span>
          <v-spacer></v-spacer>
          <v-btn light icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <formPaymentAdd />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_snd" max-width="385px">
      <v-card>
        <v-card-title class="text-h4 mb-4 font-weight-light">
          <span>Add new category</span>
          <v-spacer></v-spacer>
          <v-btn light icon @click="dialog_snd = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <formCategoryAdd />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {
    paymentsList: () => import("@/components/paymentsList.vue"),
    paginationModule: () => import("@/components/paginationModule.vue"),
    formPaymentAdd: () => import("@/components/formPaymentAdd.vue"),
    formCategoryAdd: () => import("@/components/formCategoryAdd.vue"),
    GoogleChart: () => import("@/components/googleChart.vue"),
  },
  data() {
    return {
      dialog_snd: false,
      dialog: false,
      current: 1,
      elementsOnPage: 3,
    };
  },
  computed: {
    ...mapGetters(["getPaymentsList", "getDataLoaded", "getDiagData"]),
    diagData() {
      return this.getDiagData;
    },
    currentPageElements() {
      return this.getPaymentsList.slice(
        this.elementsOnPage * (this.current - 1),
        this.elementsOnPage * (this.current - 1) + this.elementsOnPage
      );
    },
  },
  methods: {
    changePage(page) {
      this.current = page;
    },
  },
  async created() {
    if (!this.getDataLoaded) {
      await this.$store.dispatch("fetchData");
    }
  },
};
</script>

<style lang="scss">
.btn-panel {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.tags {
  display: flex;
  padding-top: 0;
  padding-left: 0;
  padding-right: 0;
  a {
    text-decoration: none;
    & + a {
      margin-left: 20px;
    }
  }
}
</style>
