import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const mutations = {
  setPaymentsListData(state, payload) {
    state.paymentList = payload
  },
  addDataToPaymentsList(state, payload){
    state.paymentList.push(payload)
  }
}
const getters = {
  getPaymentsList: state => state.paymentList,
  getFullPaymentValue: state => {
  return state.paymentList.reduce((res, cur) => res+ cur.value, 0)
  }
}

export default new Vuex.Store({
  state: {
    paymentList: []
  },

  mutations,
  getters,
})
