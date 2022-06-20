import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsList: [],
    categoryList: [],
    diagData: [],
    diagLoaded: false,
    dataLoaded: false,
    categoriesLoaded: false
  },
  getters: {
    getPaymentsList: state => state.paymentsList,
    getCategoryList: state => state.categoryList,
    getFullPaymentValue: state => {
      return state.paymentsList.reduce((res, cur) => res + cur.value, 0)
    },
    getDataLoaded: state =>state.dataLoaded,
    getCategoriesLoaded: state =>state.categoriesLoaded,
    getDiagData: state => state.diagData,
  },
  mutations: {
    setDataLoaded(state, payload){
      state.dataLoaded = payload;
    },
    setCategoriesLoaded(state, payload){
      state.categoriesLoaded = payload;
    },
    setDiagLoaded(state, payload){
      state.diagLoaded = payload;
    },
    setPaymentsListData(state, payload) {
      state.paymentsList = payload
    },
    setCategories(state, payload){
      state.categoryList = payload
    },  
    setDiagData(state, payload){
      state.diagData = payload;
    },    
    addDataToPaymentsList (state, payload) {
      state.paymentsList.push(payload)
    },
    addDiagData(state, payload){
      let result = state.diagData.find(item => item[0].toUpperCase() == payload.category.toUpperCase());
      if (result != undefined) {
        Vue.set(result, 1, result[1]+payload.value)
      } else {
        state.diagData.push([payload.category, payload.value])
      }
    },
    addDataToCategoryList (state, payload) {
      state.categoryList.push(payload)
    },
    removeDataFromPaymentsList(state, payload) {
      let filtered = state.paymentsList.filter( (item)=> item !== payload);
      state.paymentsList = filtered;
    },
    setPaymentData(state, payload){
      state.paymentsList[payload.id - 1].category = payload.category;
      state.paymentsList[payload.id - 1].value = payload.value;
    }
  },
  
  actions: {
    fetchData ({state, commit, dispatch}) {
      if (state.dataLoaded){
        return
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              date: '28.03.2020',
              category: 'Food',
              value: 169,
            },
            {
              date: '24.03.2020',
              category: 'Transport',
              value: 360,
            },
            {
              date: '24.03.2020',
              category: 'Food',
              value: 532,
            },
          ])
        }, 1000)
      })
      .then(res => {
          commit('setPaymentsListData', res);
          commit('setDataLoaded', true);
          dispatch('createDiagramData');
      });

    }, 
    fetchCategoryList({state, commit}) {
      if (state.categoriesLoaded){
        return
      }
      return new Promise((resolve)=> {
        setTimeout(()=>{
          resolve (['Food', 'Transport', 'Education', 'Entertainment'])
        }, 1000)
      }).then(res => { 
        commit('setCategories', res);
        commit('setCategoriesLoaded', true);
      })
    },
    createDiagramData({state, commit}){
      if (state.diagLoaded){
        return
      }
      let data = [
        ["Category", "Category payments sum"],
      ];      
      commit('setDiagData', data);
      state.paymentsList.forEach(payment => {
        commit('addDiagData', payment);
      });
      commit('setDiagLoaded', true);
    },
    updateDiagData({state, commit}){
      let data = [
        ["Category", "Category payments sum"],
      ];
      commit('setDiagData', data);
      state.paymentsList.forEach(payment => {
        commit('addDiagData', payment);
      });
    }
  },
  modules: {
  }
})
