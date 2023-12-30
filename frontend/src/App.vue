<template>
    <div id="app">
        <layout ref="layout">
            <template v-slot:body>
                <router-view />
            </template>
        </layout>
        <dialog_objective_modify_form ref="dialog_objective_modify_form" />
        <dialog_new_okr_form ref="dialog_new_okr_form" />
    </div>
</template>

<script>
import layout from "@/components/layout.vue";
import dialog_objective_modify_form from "@/components/objective/dialog_objective_modify_form.vue";
import dialog_new_okr_form from "@/components/OKR/dialog_new_okr_form.vue";

export default {
    name: 'App',
    computed: {
    },
    components: {
        layout,
        dialog_objective_modify_form,
        dialog_new_okr_form,
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