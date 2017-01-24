<template>

    <section class="hero is-fullheight has-text-centered">
        <div class="hero-body">
            <div class="container">
                <div class="columns">
                    <div class="column">
                        <div class="tile is-ancestor">
                            <div class="tile is-child has-text-centered">
                                <transition appear name="slide-fade" mode="out-in">
                                    <div class="content" v-if="show">
                                        <img src="../assets/logo.png">

                                        <h1 class="title is-1">
                                            Matchr
                                        </h1>

                                        <h3 class="subtitle">
                                            Matching colors made easy.
                                        </h3>
                                        <p>Move the mouse around. Scroll up or down to change the hue. <br> Double click to
                                            save.
                                        </p>

                                        <button class="button is-outlined" @click="dimiss">
                                            Start
                                        </button>
                                    </div>


                                    <matchr-canvas v-if="!show"></matchr-canvas>
                                </transition>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script type="text/babel">
    const matchrCanvas = require('./canvas/canvas.vue')

    export default {
        components: {
            matchrCanvas
        },

        data() {
            return {
                show: this.$store.state.showSplash
            }
        },

        methods: {
            dimiss() {
                this.$store.commit('dismissSplash')
                this.show = !this.show
            }
        }
    }
</script>