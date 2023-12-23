<template>
    <div id="okrVue" style="height: 100%;">
        <div>
            오케알 인데요?
        </div>
    </div>
</template>

<script>

import axios from "axios";

export default {
    name: 'okrVue',
    components: {
    },
    computed: {
        host() {
            return this.$store.state.host;
        }
    },
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() {
        let vm = this;
    },
}
</script>