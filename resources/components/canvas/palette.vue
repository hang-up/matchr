<style>
    .palette {
        height: 100vh;
        z-index: 9999;
    }

    .palette-identifer {
        padding: 1rem;
        width: 16.67%;
        background: white;
    }
</style>

<template>
    <div class="column is-2 palette is-paddingless animated fadeIn" :style="{ background: color }">
        <div class="palette-identifer is-vertically-centered">
            {{ color }}
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        props: ['color']
    }
</script>