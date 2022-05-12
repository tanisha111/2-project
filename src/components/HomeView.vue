<template>
<div class="home" >
  <header>
    <div :class="[$style.title]">My personal costs</div>
    
  </header>
  <main>
    <PaymentDisplay :items ="paymentList"/>
    <AddPaymentForm @addNewPayment="addPaymentData"/>
  </main>

</div>
  
</template>
<script>
import PaymentDisplay from "./PaymentDisplay.vue";
import AddPaymentForm from "./AddPaymentForm.vue";
export default {
  name: "HomeView",
  components: {
    PaymentDisplay,
    AddPaymentForm,
  },
  data() {
    return {
      paymentList: []
    };
  },
  methods: {
    addPaymentData(data) {
      this.paymentList.push(data)
    },
    fetchData() {
      return [
        {
          date: '28.03.2020',
          category: 'Food',
          value: '169',
        },
        {
          date: '24.03.2020',
          category: 'Transport',
          value: '360',
        },
        {
          date: '24.03.2020',
          category: 'Food',
          value: '532',
        },
      ]
    },
  },
  created () {
    this.paymentList = this.fetchData()
  },
}
</script>
<style lang='scss' module>
.title {
  font-size: 20px;
}

</style>