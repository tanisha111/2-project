<template>
<div class="paymentList">
<div class="paymentItem" v-for="(item, index) in items" :key="index">
    {{ items  }}
</div>
<div class="fpv" >
    {{ getFullPaymentsValue }}
</div>
 </div>   
</template>
<script>
export default {
    name: "PaymentDisplay",
    props: {
        items: {
            type: Array,
            default: ()=>[],
        }
    },
    computed: {
        getFullPaymentsValue() {
            return this.$store.getters.getFullPaymentsValue
        }        
    },
}
    
</script>
<style lang="scss" module>

</style>