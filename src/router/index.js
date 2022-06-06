
import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '../components/HomeView.vue'
import About from '../components/AboutView.vue'
import NotFound from '../components/views/NotFound.vue'
import AddPayment from '../components/views/AddPayment.vue'
import AddPaymentForm from '../components/AddPaymentForm.vue'
Vue.use(Router)

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: HomeView
  },
  {
    path: "/dashboard/:page",
    name: "Dashboard",
    component: HomeView
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/addpayment",
    name: "AddPayment",
    component: AddPayment
  },
  {
    path: '*',
    name: "NotFound",
    component: NotFound
  },
{
  path: '/add/:section/:category/',
  name: "AddPaymentForm",
  component: AddPaymentForm
}
  
]

const router = new Router ({
  mode: "history",
  routes
})

export default router;
