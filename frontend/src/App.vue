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
    }
}
</script>