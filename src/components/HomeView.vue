<template>
<div class="home" >
  <header>
    <div :class="[$style.title]">My personal costs</div>
    <div>Total price = {{getFullPaymentsValue}}</div>
  </header>
  <main>
    <PaymentDisplay :items ="getPaymentsList"/>
    <AddPaymentForm />
  </main>

</div>
  
</template>
<script>
import PaymentDisplay from "./PaymentDisplay.vue";
import AddPaymentForm from "./AddPaymentForm.vue";
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "HomeView",
  components: {
    PaymentDisplay,
    AddPaymentForm,
  },
  data() {
    return {
     // paymentList: []
    };
  },
  computed: {
    ... mapGetters (['getFullPaymentsValue', 'getPaymentsList']),
    //в другом месте? getFPV() {
      //return this.$store.getters.getFullPaymentsValue
   // }
  },
  methods: {
    ... mapMutations ([
      'setPaymentsListData'
    ]),
    addPaymentData(data) {
      this.paymentList.push(data)
    },
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
  async created () {
    //this.paymentList = this.fetchData()
    this.setPaymentsListData(this.fetchData())
   //this.$store.commit('setPaymentsListData', this.fetchData())
  },
}
</script>
<style lang='scss' module>
.title {
  font-size: 20px;
}

</style>