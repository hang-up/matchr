<style>
    #canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
    }
</style>

<template>
    <div id="canvas" v-on:dblclick="addColor" :style="backgroundColor">
        <identifier
                :hue="hue"
                :sat="sat"
                :light="light"
        ></identifier>

        <div class="columns is-marginless">
            <palette v-for="color in colors" :color="color"></palette>
        </div>
    </div>
</template>

<script>
    const identifier = require('./identifier.vue')
    const palette = require('./palette.vue')

    require('colorcolor')

    export default {
        components: {
            identifier,
            palette
        },

        data() {
            return {
                hue: Math.floor(Math.random() * 100),
                sat: Math.floor(Math.random() * 50),
                light: Math.floor(Math.random() * (80 - 50) + 50),
                width: window.innerWidth,
            }
        },

        computed: {
            backgroundColor() {
                let colorString = `hsla(${this.hue}, ${this.sat}%, ${this.light}%, 1)`
                 return 'background: ' + colorcolor(colorString, "hex")
            },

            colors() {
                return this.$store.state.colors
            }
        },

        created(){
            window.addEventListener("mousemove", this.getCoordinates)
            window.addEventListener("wheel", this.getScroll)
        },

        destroyed() {
            window.removeEventListener("mousemove", this.getCoordinates)
            window.addEventListener("wheel", this.getScroll)
        },

        methods: {
            /**
             * Function to get X and Y coordinates of our mouse and convert those values to colors.
             *
             * @param e
             */
            getCoordinates(e) {
                // Vue dev tools won't update those values on the fly. Test it with console.log and it works.
                this.hue = Math.floor( e.clientX / (this.width / 361))
                this.sat = Math.floor( e.clientY/ (this.width / 101))

            },

            getScroll(e) {

                // Increase the light if we scroll up
                if (e.deltaY < 0) {
                    if (this.light >= 100)
                        this.light = 100
                    else
                        this.light++
                } else {
                    if (this.light <= 0)
                        this.light = 0
                    else
                        this.light--
                }

                console.log(this.light)
            },

            addColor() {

                // Transform our coordinates into meaningful color
                let colorString = `hsla(${this.hue}, ${this.sat}%, ${this.light}%, 1)`
                let color = colorcolor(colorString, "hex")


                this.$store.commit({
                    type: 'addColor',
                    color: color
                })
            }
        }
    }
</script>