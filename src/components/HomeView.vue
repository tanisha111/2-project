<template>
<div class="home" >
  <header>
    <div :class="[$style.title]">My personal costs</div>
    <div>Total price = {{getFullPaymentsValue}}</div>
  </header>
  <main>
    
    <AddPaymentForm />
    <PaymentDisplay :items ="currentElements"/>
    <MyPagination :cur="cur" :length="12" :n="n" @changePage="changePage"/>
    
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
      this.$store.dispatch('fetchData', p)
   
    }
        ///fetchData() {
      ////return [
      ///  {
       ///   date: '28.03.2020',
        ///  category: 'Food',
        ///  value: '169',
       /// },
       //// {
        //  date: '24.03.2020',
        //  category: 'Transport',
         /// value: '360',
       // },
       /// {
       //   date: '24.03.2020',
       //   category: 'Food',
       //   value: '532',
      //  },
     // ]
   // },
  },
  created() {
  this.$store.dispatch('fetchData', this.cur)
    
  },
  mounted() {

  },
};
</script>
<style lang='scss' module>
.title {
  font-size: 20px;
}

</style>