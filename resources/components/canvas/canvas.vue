<style>
    #canvas {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: black;
    }
</style>

<template>
    <div id="canvas" v-on:dblclick="addColor">
    </div>
</template>

<script>
    export default {
        data() {
            return {
                x: 0,
                y: 0
            }
        },

        created(){
            window.addEventListener("mousemove", this.getCoordinates)
        },

        destroyed() {
            window.removeEventListener("mousemove", this.getCoordinates)
        },

        methods: {
            /**
             * Function to get X and Y coordinates of our mouse and convert those values to colors.
             *
             * @param e
             */
            getCoordinates(e) {

                // Vue dev tools won't update those values on the fly. Test it with console.log and it works.
                this.x = e.clientX
                this.y = e.clientY
            },

            addColor() {
                this.$store.commit({
                    type: 'addColor',
                    color: '#333'
                })
            }
        }
    }
</script>