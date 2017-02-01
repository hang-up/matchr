<template>
    <div>
        <splash></splash>
    </div>
</template>

<script>
    import splash from './splash.vue'

    export default {
        components: {
            splash
        },

        mounted() {
            if (this.$route.hash) {
                // Regex found here: http://stackoverflow.com/a/25538880
                // Cause let's be honest, I suck at event the most basic regex...
                _.each(this.$route.hash.match(/#\w+/g), (c) => {
                    this.$store.state.colors.push(c)
                })

                this.$store.commit('toggleSplash')
            }
        }
    }
</script>
