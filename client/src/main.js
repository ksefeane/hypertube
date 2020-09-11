import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router/index'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem("jwt") == null) {
            next({path:'/'})
        } else {
            next()
        }
    } else {
        next()
    }
})

Vue.config.productionTip = false

new Vue({
  Vue,
  router: router,
  render: h => h(App),
 }).$mount('#app')