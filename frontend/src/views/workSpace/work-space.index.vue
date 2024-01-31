<template>
    <div id="workSpaceVue" style="height: 100%;">
        <div class="bg-black text-white q-mb-md" style="border-radius: 5px;">
            <q-toolbar>
                <q-breadcrumbs class="faSB text-h6">
                    <q-breadcrumbs-el class="text-white" label="워크스페이스" />
                    <q-breadcrumbs-el v-if="work_space" class="text-primary" 
                        @click="$router.push('/work-space/' + work_space.work_space_id)"
                        :label="work_space.work_space_name" style="cursor: pointer;"/>
                </q-breadcrumbs>
            </q-toolbar>
        </div>
        <div class="row">
            <div>
                <q-btn label="OKR 추가" color="black" icon="add" class="faSB ft16" 
                    rounded @click="onAddOkr" />
            </div>
            <q-space />
            <div>
                <q-btn-group>
                    <q-btn :class="viewType=='list'?'bg-black text-white':'bg-white text-black'"
                        @click="viewType='list'"
                        icon="list" />
                </q-btn-group>
            </div>
        </div>
        <div class="q-mt-md">
            <template v-if="!okrs || okrs.length == 0">
                <div class="faSB ft24">
                    워크스페이스에 OKR이 없습니다. 생성해주세요.
                </div>
            </template>
            <template v-else>
                <template v-if="viewType==='list'">
                    <listView :okrs="okrs" ref="listView" />
                </template>
            </template>
        </div>
    </div>
    
</template>

<script>

import axios from 'axios';
import listView from "@/views/workSpace/work-space.listView.vue";

export default {
    name: 'workSpaceVue',
    components: {
        listView
    },
    data() {
        return {
            viewType: 'list',
            treeConfig: { nodeWidth: 200, nodeHeight: 80, levelHeight: 200 },
            step: 0,
            work_space_id: 0,
            work_space: null,
            okrs: [],
            members: [],
            progress1: 0.1,
        }
    },
    methods: {
        initPage() {
            let vm = this;
            vm.okrs = [];
        },
        onAddOkr() {
            let vm = this;
            vm.$root.$refs.dialog_okr.open({
                mode: 'add',
                work_space_id: vm.work_space_id,
            }, () => {
                vm.loadOKR(vm.work_space_id);
            });
        },
        loadOKR(work_space_id) {
            let vm = this;
            vm.$q.loading.show();
            axios.get(`/api/okr/work-space/${work_space_id}`, {

            }).then((res) => {
                let response = res.data;
                if(response.status === 200) {
                    let okrs = response.data;
                    okrs.map((x) => {
                        x["start_date_view"] = window.$c.formatDate(x.start_date, "YYYY-MM-DD");
                        x["end_date_view"] = window.$c.formatDate(x.end_date, "YYYY-MM-DD");
                    });
                    vm.okrs = okrs;

                }
                vm.$q.loading.hide();
            }).catch((err) => {
                vm.$q.loading.hide();
                if(err.response?.status == 403) {
                    vm.$c.response_notify("error", "negative", err.response?.data?.message);
                }
            });
        },
    },
    mounted() {
        let vm = this;
        if(Object.prototype.hasOwnProperty.call(vm.$route.params, "work_space_id") == false) {
            vm.$c.response_notify("error", "negative", "잘못된 URL 요청입니다.");
            vm.$router.push("/error");
        }

        vm.work_space_id = vm.$route.params.work_space_id;
        vm.work_space = vm.$store.state.work_spaces.find(x=>x.work_space_id == vm.work_space_id);
        vm.initPage();
        vm.loadOKR(vm.work_space_id);
        
        vm.$watch(() => this.$route.params, (newValue, oldValue) => {
            if(Object.prototype.hasOwnProperty.call(vm.$route.params, "work_space_id") == false) {
                vm.$q.notify({
                    title: '에러',
                    message: '잘못된 URL 요청입니다.',
                });
                vm.$router.push("/error");
            }

            vm.work_space_id = vm.$route.params.work_space_id;
            vm.work_space = vm.$store.state.work_spaces.find(x=>x.work_space_id == vm.work_space_id);
            vm.initPage();
            vm.loadOKR(vm.work_space_id);
        });
    },
}
</script>