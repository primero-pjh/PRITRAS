<template>
    <div id="homeVue" style="height: 100%;">
        <div>
            공지사항(중요사항) 을 알려주는 UI/UX123
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