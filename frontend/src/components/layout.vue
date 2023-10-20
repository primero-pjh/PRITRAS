<template>
    <div id="layoutVue">
        <q-layout
            view="hHr LpR fFr"
            container
            style="height: 100vh;"
            class="shadow-2 rounded-borders">
            <q-header reveal class="bg-grey">
                <q-toolbar>
                    <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />
                    <q-toolbar-title class="fkB">PRITRAS</q-toolbar-title>
                    <q-btn flat @click="drawerRight = !drawerRight" round dense icon="menu" />
                </q-toolbar>
            </q-header>

            <!-- <q-footer>
                <q-toolbar>
                    <q-toolbar-title>Footer</q-toolbar-title>
                </q-toolbar>
            </q-footer> -->

            <q-drawer v-model="drawerLeft"
                :width="200" :breakpoint="700" bordered>
                <q-scroll-area class="fit">
                    <div class="q-pa-sm">
                        <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
                    </div>
                </q-scroll-area>
            </q-drawer>

            <q-drawer side="right" v-model="drawerRight"
                bordered :width="200" :breakpoint="500">
                <q-scroll-area class="fit">
                    <div class="q-pa-sm">
                        <div v-for="n in 50" :key="n">Drawer {{ n }} / 50</div>
                    </div>
                </q-scroll-area>
            </q-drawer>

            <q-page-container>
                <q-page class="q-pa-md" style="background: #eee;">
                    <slot name="body">
                
                    </slot>
                </q-page>

                <q-page-scroller position="bottom">
                    <q-btn fab icon="keyboard_arrow_up" color="red" />
                </q-page-scroller>
            </q-page-container>
        </q-layout>
            
    </div>
</template>

<script>
export default {
    name: 'layoutVue',
    data() {
        return {
            drawerLeft: true,
            drawerRight: false,
        }
    },
    props: {
    },
    computed: {
    },
    methods: {
    },
    mounted() {
    }
}
</script>