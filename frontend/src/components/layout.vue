<template>
    <div id="layoutVue">
        <q-layout
            view="hHr LpR fFr"
            container
            style="height: 100vh;"
            class="shadow-2 rounded-borders">
            <q-header reveal class="bg-black" v-if="isHeaderShow">
                <q-toolbar>
                    <q-btn flat @click="toggleDrawerLeft" round dense icon="dashboard" />
                    <q-toolbar-title class="fkB">
                        PRITRAS
                    </q-toolbar-title>
                    <template v-if="$store.state.isLogged">
                        <q-btn flat icon="notifications" />
                        <q-img src="https://cdn.quasar.dev/img/boy-avatar.png" @click="toggleDrawerRight" 
                            style="width: 40px; border-radius: 25px; cursor: pointer; border: 3px solid white;" 
                            fit="cover" />
                    </template>
                    <template v-else>
                        <q-btn class="fkB ft16" outline label="로그인" @click="goto_login" />
                    </template>
                </q-toolbar>
            </q-header>

            <!-- <q-footer>
                <q-toolbar>
                    <q-toolbar-title>Footer</q-toolbar-title>
                </q-toolbar>
            </q-footer> -->

            <q-drawer v-model="drawerLeft" :width="248" :breakpoint="700" bordered>
                <q-scroll-area class="fit ">
                    <div style="display: flex;">
                        <div></div>
                        <q-space></q-space>
                        <q-btn icon="close" flat @click="toggleDrawerLeft"></q-btn>
                    </div>
                    <q-separator />
                    <q-list class="q-px-md">
                        <q-item-label class="fkB ft12 q-pt-md q-px-sm text-grey-7">QUICK MENU</q-item-label>
                        <q-item clickable v-ripple @click="goto_home">
                            <q-item-section class="faSB ft16">
                                <q-item-label>홈화면</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple @click="goto_calendar" v-if="$store.state.isLogged">
                            <q-item-section class="faSB ft16">
                                <q-item-label>개별 캘린더</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple @click="goto_okr" v-if="$store.state.isLogged">
                            <q-item-section class="faSB ft16">
                                <q-item-label>개별 OKR</q-item-label>
                            </q-item-section>
                        </q-item>
                        
                        <template v-if="$store.state.isLogged">
                            <q-separator></q-separator>
                            <q-item-label class="fkB ft12 q-pt-md q-px-sm text-grey-7">
                                <div style="display: flex; align-items: center;">
                                    <div>워크스페이스</div>
                                    <q-space />
                                    <div>
                                        <q-btn icon="add" flat dense size="sm"
                                            @click="$router.push('/setting/workSpace/0')" />
                                    </div>
                                </div>
                            </q-item-label>
                            <template v-for="ws, ws_i in workSpaces" :key="ws_i">
                                <q-item clickable v-ripple @click="goto_workSpace(ws.WorkSpaceId)">
                                    <q-item-section class="faSB ft16">
                                        <q-item-label>{{ ws.WorkSpaceName }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </template>
                            <q-separator></q-separator>
                            <q-item-label class="fkB ft12 q-pt-md q-px-sm text-grey-7"
                                style="cursor: pointer;" @click="expandP2P=!expandP2P">
                                <div style="display: flex; justify-content: space-between;">
                                    <div>1:1</div>
                                    <div v-if="expandP2P"><q-icon name="expand_less" /></div>
                                    <div v-else><q-icon name="expand_more" /></div>
                                </div>
                            </q-item-label>
                            <template v-if="expandP2P">
                                <q-item clickable v-ripple>
                                    <q-item-section side>
                                        <q-avatar rounded size="30px" style="display: flex;">
                                            <q-img src="https://cdn.quasar.dev/img/boy-avatar.png" style="border-radius: 15px;" />
                                            <q-badge floating rounded color="negative"></q-badge>
                                        </q-avatar>
                                    </q-item-section>
                                    <q-item-section class="fkR ft16">
                                        <q-item-label>박재현</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </template>
                            
                        </template>
                    </q-list>
                </q-scroll-area>
            </q-drawer>

            <q-drawer side="right" v-model="drawerRight" behavior="mobile" 
                bordered :width="320" :breakpoint="700">
                <q-scroll-area class="fit">
                    <div>
                        <div style="display: flex; align-items: center;" class="q-pa-sm">
                            <div class="faH ft20">Account</div>
                            <q-space></q-space>
                            <q-btn flat icon="close" round v-close-popup @click="toggleDrawerRight" />
                        </div>
                        <q-separator></q-separator>
                        <div>
                            <q-list bordered>
                                <q-item-label class="faH ft16 q-pa-md">CONFLUENCE</q-item-label>
                                <q-item clickable v-ripple @click="onLogout">
                                    <q-item-section>
                                        <q-item-label class="faB">프로파일</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable v-ripple @click="onLogout">
                                    <q-item-section>
                                        <q-item-label class="faB">작업</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable v-ripple @click="onLogout">
                                    <q-item-section>
                                        <q-item-label class="faB">환경설정</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-separator></q-separator>
                                <q-item clickable v-ripple @click="onLogout">
                                    <q-item-section>
                                        <q-item-label class="faB">로그아웃</q-item-label>
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
            expandP2P: true,
        }
    },
    props: {
    },
    computed: {
        drawerLeft() { return this.$store.state.drawerLeft; },
        drawerRight() { return this.$store.state.drawerRight; },
        isHeaderShow() { return this.$store.state.isHeaderShow; },

        workSpaces() {
            return this.$store.state.workSpaces;
        }
    },
    methods: {
        toggleDrawerLeft() {
            this.$store.commit("toggleDrawerLeft");
        },
        toggleDrawerRight() {
            this.$store.commit("toggleDrawerRight");
        },
        goto_home() {
            let vm = this;
            vm.$router.push('/');
            if(vm.$store.state.isMobile) { 
                vm.$store.commit("setDrawerLeft", false); 
            }
        },
        goto_calendar() {
            let vm = this;
            vm.$router.push('/calendar');
            if(vm.$store.state.isMobile) { 
                vm.$store.commit("setDrawerLeft", false); 
            }
        },
        goto_okr() {
            let vm = this;
            vm.$router.push("/okr");
        },
        goto_login() {
            let vm = this;
            vm.$router.push('login');
        },
        goto_workSpace(WorkSpaceId) {
            let vm = this;
            // window.location.href = '/#/workSpace/' + WorkSpaceId;
            vm.$router.push(`/workSpace/${WorkSpaceId}`);
        },

        onLogout() {
            let vm = this;
            vm.$store.commit("setAppUser", null);
            window.location.reload();
        },
    },
    mounted() {
        let vm = this;
        console.log("route:", );
    }
}
</script>