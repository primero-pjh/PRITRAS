<template>
    <div id="app">
        <layout ref="layout">
            <template v-slot:body>
                <router-view />
            </template>
        </layout>
    </div>
</template>

<script>
import layout from "@/components/layout.vue";

export default {
    name: 'App',
    computed: {
    },
    components: {
        layout,
    },
    data() {
        return {
        }
    },
    mounted: function() {
        let vm = this;
        vm.$store.state.host = process.env.VUE_APP_HOST;
        vm.$router.beforeEach((to, from, next) => {
            // console.log(to, from);
            document.title = to.meta.title;
            if(to.meta.hasLogged) {
                if(vm.$store.state.isLogged == false) {
                    vm.$router.push('/error');
                    return;
                }
            }
            vm.$store.commit("setHeaderShow", to.path === '/login' ? false : true);
            next();
        });
    }
}
</script>