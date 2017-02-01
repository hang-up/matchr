<style>
    #share {
        position: fixed;
        top: 0;
        left: 70px;
        width: 100%;
        padding: 0.5rem 0.5rem 0.2rem 0.5rem;
        background: #fff;
        z-index: 99999;
    }
</style>

<template>
    <span id="share" class="has-text-centered">
        copy this link: {{ $store.getters.shareLink }}
    </span>
</template>

<script type="text/babel">
    const _ = require('lodash')

    export default {
        methods: {
            toggleShare() {
                this.$store.commit('toggleShare')
            }
        }
    }
</script>