<style>
    #identifier {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        padding: 0.5rem 0.5rem 0.2rem 0.5rem;
        background: #fff;
        z-index: 99999;
    }
</style>
<template>
    <div id="identifier">
        <transition name="slide-fade">
            <a class="button is-white is-pulled-left" v-if="$store.state.colors.length" @click="showShare">share</a>
        </transition>

        <transition name="slide-fade" mode="out-in">
            <share v-if="$store.state.showShare"></share>
        </transition>

        <h3 class="button is-white is-disabled"
            style="color: rgba(39, 39, 39, 0.7); display: inline-block;"
        >{{ backgroundColor }}</h3>

        <a class="button is-white is-pulled-right" @click="showSplash">help?</a>
    </div>
</template>
<script type="text/babel">
    export default {
        props: ['hue', 'sat', 'light'],

        components: {
            share: require('./share.vue')
        },

        computed: {
            backgroundColor() {
                let colorString = `hsla(${this.hue}, ${this.sat}%, ${this.light}%, 1)`
                return colorcolor(colorString, "hex")
            }
        },

        methods: {
            showSplash() {
                this.$store.commit('toggleSplash')
            },

            showShare() {
                this.$store.commit('toggleShare')
            }
        }
    }
</script>
