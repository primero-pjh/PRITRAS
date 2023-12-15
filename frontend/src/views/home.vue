<template>
    <div id="homeVue" style="height: 100%;">
        <div>
            홈화면
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
        axios.get(`/api/user/company/1`, {}).then((res) => {
            let data = res.data;
            console.log("data:", data);
        }).catch((err) => {
            console.log(err);
        });
    },
}
</script>