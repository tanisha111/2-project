<template>
    <div>

    <router-link :to="{name: 'AddPaymentForm', 
    params: {
        section: 'payment',
        category: 'Food'
        },query: {value:200}}">Food 200</router-link> <br>
    <router-link :to="{name: 'AddPaymentForm', 
    params: {
        section: 'Payment',
        category: 'Transport'
        },query: {value:500}}">Transport 500</router-link> <br>
    <router-link :to="{name: 'AddPaymentForm', 
    params: {
        section: 'Payment',
        category: 'Entertaiment'
        },query: {value:2000}}">Entertainment 2000</router-link>
    </div>
</template>
<script>
export default {
    name: "AddPayment",
    component: {},
  
}
</script>