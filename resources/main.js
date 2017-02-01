import Vue from 'vue'
import app from './components/app.vue'
import store from './store.js'
import Vuex from 'vuex'
require('./sass/main.scss')

Vue.use(Vuex)

new Vue({
    el: '#app',
    store,
    render: h => h(app)
})
