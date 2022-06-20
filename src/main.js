import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import modal from './plugins/modalWindow'
import dropdown from './plugins/dropdownMenu'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(modal)
Vue.use(dropdown)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
