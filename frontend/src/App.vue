<template>
    <div id="app">
        <layout ref="layout">
            <template v-slot:body>
                <router-view />
            </template>
        </layout>
        <dialog_objective ref="dialog_objective" />
        <dialog_okr ref="dialog_okr" />
    </div>
</template>

<script>
import layout from "@/components/layout.vue";
import dialog_objective from "@/components/objective/dialog.objective.vue";
import dialog_okr from "@/components/okr/dialog.okr.vue";

export default {
    name: 'App',
    computed: {
    },
    components: {
        layout,
        dialog_objective,
        dialog_okr,
    },
    data() {
        return {
        }
    },
    mounted: function() {
        let vm = this;
        const locale = vm.$store.state.getCookie('locale');
        vm.$i18n.locale = locale;
        if(!locale) {
            vm.$store.state.setCookie('locale', 'KO');
            vm.$i18n.locale = 'KO';
        }
        vm.$store.state.host = process.env.VUE_APP_HOST;
        vm.$router.beforeEach((to, from, next) => {
            // console.log(to, from);
            document.title = `PRITRAS - ${to.meta.title}`;
            if(to.meta.hasLogged) {
                if(vm.$store.state.isLogged == false) {
                    vm.$router.push('/');
                    return;
                }
            }
            vm.$store.commit("setHeaderShow", to.path === '/login' ? false : true);
            next();
        });
    }
}
</script>