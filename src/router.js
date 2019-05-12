import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './pages/HomePage.vue'
import AuthPage from './pages/AuthPage.vue'
import CartPage from './pages/CartPage.vue'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/login',
      name: 'AuthPage',
      component: AuthPage
    },
    {
      path: '/cart',
      name: 'CartPage',
      component: CartPage
    }
  ]
})
