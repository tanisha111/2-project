<template>
  <div class="home">
    <div>
      <header>
        <h1 class="title">My personal costs</h1>
      </header>
      <nav class="tags">
        <router-link to="/add/payment/Transport?value=200">
          Transport: 200$
        </router-link>
        <router-link to="/add/payment/Food?value=120"> Food: 120$ </router-link>
      </nav>
      <div class="btn-panel">
        <button @click="openModalAddCost" class="btn show">
          Add new cost <span>+</span>
        </button>
        <button @click="openModalAddCategory" class="btn show">
          Add new category <span>+</span>
        </button>
      </div>
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
      <br />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {
    paymentsList: () => import("@/components/paymentsList.vue"),
    paginationModule: () => import("@/components/paginationModule.vue"),
  },
  data() {
    return {
      current: 1,
      elementsOnPage: 3,
    };
  },
  computed: {
    ...mapGetters(["getPaymentsList", "getDataLoaded"]),
    currentPageElements() {
      return this.getPaymentsList.slice(
        this.elementsOnPage * (this.current - 1),
        this.elementsOnPage * (this.current - 1) + this.elementsOnPage
      );
    },
  },
  methods: {
    ...mapMutations(["setPaymentsListData"]),
    changePage(page) {
      this.current = page;
    },
    changeVisiability(el) {
      this[el] = !this[el];
    },
    openModalAddCost() {
      this.$modal.show("addpayment", {
        title: "Add new cost",
        component: "formPaymentAdd",
      });
    },
    openModalAddCategory() {
      this.$modal.show("addcategory", {
        title: "Add new category",
        component: "formCategoryAdd",
      });
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
.title {
  font-size: 44px;
}
.home {
  display: flex;
}
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
.btn {
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
  span {
    margin-left: 5px;
    font-size: 16px;
  }
  &:hover,
  &:active {
    background-color: #0b5ed7;
    border-color: #0a58ca;
  }
  &:focus {
    box-shadow: 0 0 0 0.25rem rgb(49 132 253 / 50%);
  }
}
</style>
