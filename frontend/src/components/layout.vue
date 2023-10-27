<template>
    <div id="layoutVue">
        <q-layout
            view="hHr LpR fFr"
            container
            style="height: 100vh;"
            class="shadow-2 rounded-borders">
            <q-header reveal class="bg-grey" v-if="isHeaderShow">
                <q-toolbar>
                    <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="dashboard" />
                    <q-toolbar-title class="fkB" style="cursor: pointer;" @click="goto_home">
                        PRITRAS
                    </q-toolbar-title>
                    <template v-if="$store.state.isLogged">
                        <q-btn outline @click="drawerRight = !drawerRight" 
                            round dense icon="person">
                            <q-tooltip>계정</q-tooltip>
                        </q-btn>
                    </template>
                    <template v-else>
                        <q-btn class="fkB ft16" label="로그인" flat @click="goto_login" />
                    </template>
                </q-toolbar>
            </q-header>

            <!-- <q-footer>
                <q-toolbar>
                    <q-toolbar-title>Footer</q-toolbar-title>
                </q-toolbar>
            </q-footer> -->

            <q-drawer v-model="drawerLeft"
                :width="248" :breakpoint="700" bordered>
                <q-scroll-area class="fit q-pa-md">
                    <q-list>
                        <q-item-label class="fkB ft12 q-pt-md q-px-sm text-grey-7">QUICK MENU</q-item-label>
                        <q-item clickable v-ripple @click="goto_home">
                            <q-item-section class="fkR ft16">
                                <q-item-label>홈화면</q-item-label>
                            </q-item-section>
                        </q-item>
                        
                        <template v-if="$store.state.isLogged">
                            <q-separator></q-separator>
                            <q-item-label class="fkB ft12 q-pt-md q-px-sm text-grey-7">1:1</q-item-label>
                            <q-item clickable v-ripple>
                                <q-item-section side>
                                    <q-avatar rounded size="30px" style="display: flex;">
                                        <img src="https://cdn.quasar.dev/img/boy-avatar.png" style="border-radius: 15px;" />
                                        <q-badge floating rounded color="negative"></q-badge>
                                    </q-avatar>
                                </q-item-section>
                                <q-item-section class="fkR ft16">
                                    <q-item-label>박재현</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-separator></q-separator>
                            <q-item-label class="fkB ft12 q-pt-md q-px-sm text-grey-7">채팅방</q-item-label>
                            <q-item clickable v-ripple>
                                <q-item-section class="fkR ft16">
                                    <q-item-label>IT개발실</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-ripple>
                                <q-item-section class="fkR ft16">
                                    <q-item-label>경영지원본부</q-item-label>
                                </q-item-section>
                            </q-item>
                        </template>
                    </q-list>
                </q-scroll-area>
            </q-drawer>

            <q-drawer side="right" v-model="drawerRight" behavior="mobile" 
                bordered :width="320" :breakpoint="700">
                <q-scroll-area class="fit">
                    <div>
                        <div>
                            <p>계정</p>
                        </div>
                        <q-separator></q-separator>
                        <div>
                            <q-list bordered>
                                <q-item-label class="fkB ft16 q-pa-md">CONFLUENCE</q-item-label>
                                <q-item clickable v-ripple @click="onLogout">
                                    <q-item-section>
                                        <q-item-label>프로파일</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable v-ripple @click="onLogout">
                                    <q-item-section>
                                        <q-item-label>작업</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable v-ripple @click="onLogout">
                                    <q-item-section>
                                        <q-item-label>환경설정</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-separator></q-separator>
                                <q-item clickable v-ripple @click="onLogout">
                                    <q-item-section>
                                        <q-item-label>로그아웃</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </div>
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
        isHeaderShow() { return this.$store.state.isHeaderShow; }
    },
    methods: {
        goto_home() {
            let vm = this;
            vm.$router.push('/');
        },
        goto_login() {
            let vm = this;
            vm.$router.push('login');
        },

        onLogout() {
            let vm = this;
            vm.$store.commit("setAppUser", null);
            window.location.reload();
        },
    },
    mounted() {
        let vm = this;
    }
}
</script>