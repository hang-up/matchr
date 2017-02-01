import Vue from 'vue'
import app from './components/app.vue'
import store from './store.js'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
require('./sass/main.scss')

Vue.use(Vuex)

Vue.use(VueRouter)

const routes = [
    { path: '/', component: require('./components/app.vue')  }
]

const router = new VueRouter({
    routes
})

new Vue({
    store,
    router
}).$mount('#app')
