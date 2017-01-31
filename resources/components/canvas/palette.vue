<style>
    .palette {
        height: 100vh;
        z-index: 9999;
    }

    .is-vertically-centered {
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
    }
</style>

<template>
    <div class="column is-2 palette" :style="{ background: color }">
        <div class="palette-identifer has-text-centered is-vertically-centered">
            {{ color }}
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        props: ['color'],

        data() {
            return {

            }
        }
    }
</script>