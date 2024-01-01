<template>
    <div id="workSpaceVue" style="height: 100%;">
        <div class="bg-black text-white q-mb-md" style="border-radius: 5px;">
            <q-toolbar>
                <q-breadcrumbs class="faSB text-h6">
                    <q-breadcrumbs-el class="text-white" label="워크스페이스" />
                    <q-breadcrumbs-el v-if="workSpace" class="text-primary" 
                        @click="$router.push('/workSpace/' + workSpace.WorkSpaceId)"
                        :label="workSpace.WorkSpaceName" style="cursor: pointer;"/>
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
import listView from "@/views/workSpace/listView.vue";

export default {
    name: 'workSpaceVue',
    components: {
        listView
    },
    data() {
        return {
            isIndeterminate: true,

            viewType: 'list',
            dataset: {
                value: 'root',
                children: [
                    { value: '2', },
                    { value: '3' }
                ]
            },
            treeConfig: { nodeWidth: 200, nodeHeight: 80, levelHeight: 200 },
            step: 0,
            workSpaceId: 0,
            workSpace: null,
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
            vm.$root.$refs.dialog_new_okr_form.open('add', 0, () => {
                vm.loadOKR(vm.workSpaceId);
            });
        },
        loadOKR(workSpaceId) {
            let vm = this;
            vm.$q.loading.show();
            axios.get(`/api/okr/${workSpaceId}`, {

            }).then((res) => {
                let data = res.data;
                if(data.success) {
                    let okrs = data.okrs;
                    okrs.map((x) => {
                        x["StartDateView"] = vm.$c.formatDate(new Date(x.StartDate), "date");
                        x["EndDateView"] = vm.$c.formatDate(new Date(x.EndDate), "date");
                    });
                    vm.okrs = okrs;

                    setTimeout(() => { vm.isIndeterminate = false; });
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
        if(Object.prototype.hasOwnProperty.call(vm.$route.params, "workSpaceId") == false) {
            vm.$c.response_notify("error", "negative", "잘못된 URL 요청입니다.");
            vm.$router.push("/error");
        }

        vm.workSpaceId = vm.$route.params.workSpaceId;
        vm.workSpace = vm.$store.state.workSpaces.find(x=>x.WorkSpaceId == vm.workSpaceId);
        vm.initPage();
        vm.loadOKR(vm.workSpaceId);
        
        vm.$watch(() => this.$route.params, (newValue, oldValue) => {
            if(Object.prototype.hasOwnProperty.call(vm.$route.params, "workSpaceId") == false) {
                vm.$q.notify({
                    title: '에러',
                    message: '잘못된 URL 요청입니다.',
                });
                vm.$router.push("/error");
            }

            vm.workSpaceId = vm.$route.params.workSpaceId;
            vm.workSpace = vm.$store.state.workSpaces.find(x=>x.WorkSpaceId == vm.workSpaceId);
            vm.initPage();
            vm.loadOKR(vm.workSpaceId);
        });
    },
}
</script>