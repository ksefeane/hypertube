import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './router/index'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: Routes
})

Vue.config.productionTip = false

new Vue({
  Vue,
  router: router,
  render: h => h(App),
 }).$mount('#app')
