<template>
    <div id="homeVue" style="height: 100%;">
        <div>
            {{ host }}
        </div>
    </div>
</template>

<script>

import axios from "axios";

export default {
    name: 'homeVue',
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