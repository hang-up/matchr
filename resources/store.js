const _ = require('lodash')
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        showSplash: true,
        colors: []
    },

    mutations: {
        toggleSplash(state) {
            state.showSplash = !state.showSplash
        },

        addColor(state, payload) {
            if (state.colors.length < 5) state.colors.push(payload.color)
        },

        deleteColor(state, payload) {
            // Delete the element that has the color equal to payload.
            state.colors.splice(state.colors.findIndex((e) => e === payload.color), 1)
        }
    }
})

export default store