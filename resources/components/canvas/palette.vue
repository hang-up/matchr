<style>
    .palette {
        height: 100vh;
        z-index: 9999;
    }

    .palette-identifer {
        padding: 0.5rem;
        width: 16.67%;
        background: white;
    }
</style>

<template>
    <div class="column is-2 palette is-paddingless animated" :class="[animateClass]" :style="{ background: color }">
        <div class="palette-identifer is-vertically-centered">
            <div>{{ color }}</div>
            <button class="button is-white is-small" @click="deleteColor">remove</button>
        </div>

    </div>
</template>

<script type="text/babel">
    export default {
        props: ['color'],

        data() {
            return {
                animateClass: 'fadeIn',
            }
        },

        methods: {
            deleteColor() {
                this.$store.commit({
                    type: 'deleteColor',
                    color: this.color
                })
            }
        }
    }
</script>