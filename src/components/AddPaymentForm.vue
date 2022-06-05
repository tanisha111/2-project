<template>
   <div class="form-wrapper">
    <div class="form" v-if="isElVisible">
    <input v-model="date" placeholder="date"/>
    <select v-model="category" v-if="categoryList">
    <option v-for="(value, idx) in categoryList" :key="idx">{{value}}</option>
    </select>

      <input v-model.number="value" placeholder="value"/>
      </div>
      <button @click="onClickSave">Save</button>   
      <button @click="show">Add new coast +</button> 
       </div> 
       
</template>
<script>
export default {
    name: "AddPaymentForm",
    data() {
    return {
        isElVisible: true,
        date: "",
        category: "",
        value: ""
    }
    },
    computed: {
        getCurrentDate(){
            const today = new Date();
            const d = today.getDate();
            const m = today.getMonth()+1;
            const y = today.getFullYear();
            return `${d}.${m}.${y}`

        },
        categoryList(){
            return this.$store.getters.getCategoryList
        }
    },
    methods: {
        show(){
            this.isElVisible = !this.isElVisible
        },
        onClickSave(){
            const data = {
                date: this.date || this.getCurrentDate,
                category: this.category,
                value: this.value
            }
            this.$store.commit('addDataToPaymentsList', data)
            //this.$emit('addNewPayment', data)
            //console.log(data);
        }
    },
    async created() {
        await this.$store.dispatch('fetchCategoryList')
    },
    mounted() {
       // if(this.categoryList.lehght) {
         //   this.category = this.categoryList[0]
        //}
    },
}
</script>
