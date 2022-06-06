<template>
<div class="home" >
  <header>
    <div :class="[$style.title]">My personal costs</div>
    <div>Total price = {{getFullPaymentsValue}}</div>
  </header>
  <main>
    
    <AddPaymentForm />
    <PaymentDisplay :items ="currentElements"/>
    <MyPagination :cur= "cur" :length="getPaymentsList.length" :n="n" @changePage="changePage"/>
    
  </main>

</div>
  
</template>
<script>
import AddPaymentForm from "./AddPaymentForm.vue";
import PaymentDisplay from "./PaymentDisplay.vue";

import { mapMutations, mapGetters } from "vuex";
import MyPagination from "./MyPagination.vue";

export default {
  name: "HomeView",
  components: {
    AddPaymentForm,
    PaymentDisplay,
    MyPagination
},
  data() {
    return {
     cur: 1,
     n: 3,

    };
  },
  computed: {
    ... mapGetters (['getFullPaymentsValue', 'getPaymentsList']),
    currentElements(){
      return this.getPaymentsList.slice(this.n * (this.cur - 1), this.n * (this.cur - 1) + this.n)
    }
  },
  methods: {
    
    
    ... mapMutations ([
      'setPaymentsListData'
    ]),
    addPaymentData(data) {
      this.paymentList.push(data)
    },
    changePage(p) {
      this.cur = p
      }

        
  },
  created() {
  this.$store.dispatch('fetchData')
    
  },
  mounted() {
    
 // if(!this.$route.params ?.page || isNaN(this.$route.params.page))
//this.cur = Number(this.$route.params.page)
  },
}
</script>
<style lang='scss' module>
.title {
  font-size: 20px;
}

</style>