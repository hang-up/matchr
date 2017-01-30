<style>
    #identifier {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: #fff;
        z-index: 99999;
    }
</style>
<template>
    <div id="identifier">
        <h3 class="subtitle has-text-centered" style="color: rgba(39, 39, 39, 0.7);">{{ backgroundColor }}</h3>
    </div>
</template>
<script type="text/babel">
    export default {
        props: ['hue', 'sat', 'light'],

        computed: {
            backgroundColor() {
                let colorString = `hsla(${this.hue}, ${this.sat}%, ${this.light}%, 1)`
                return 'background: ' + colorcolor(colorString, "hex")
            }
        },
    }
</script>
