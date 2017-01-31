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
        }
    }
})

export default store