const _ = require('lodash')
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        showSplash: true,
        showShare: false,
        colors: []
    },

    getters: {
        shareLink: state => {
            // Obviously we need to change this to a another domain...
            let res = "http://hang-up.github.io/Projects/Matchr/index.html#/"
            _.each(state.colors, (c) => {
                res += c
            })

            return res
        }
    },

    mutations: {
        toggleSplash(state) {
            state.showSplash = !state.showSplash
        },

        toggleShare(state) {
            state.showShare = !state.showShare
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