<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        {{ test }}
    </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'App',
    components: {
        // HelloWorld
    },
    data() {
        return {
            test: '123',
        }
    },
    mounted() {
        let vm = this;
    }
}
</script>
