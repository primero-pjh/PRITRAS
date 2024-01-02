<template>
    <div id="workSpaceVue" style="height: 100%;">
        <div class="bg-black text-white q-mb-md" style="border-radius: 5px;">
            <q-toolbar>
                <q-breadcrumbs class="faSB text-h6">
                    <q-breadcrumbs-el class="text-white" label="워크스페이스" />
                    <q-breadcrumbs-el v-if="workSpace" class="text-primary" 
                        @click="$router.push('/workSpace/' + workSpace.WorkSpaceId)"
                        :label="workSpace.WorkSpaceName" style="cursor: pointer;"/>
                    <q-breadcrumbs-el v-if="OKR" class="text-white" :label="OKR.Title" />
                </q-breadcrumbs>
            </q-toolbar>
        </div>
        <q-btn label="목표 추가" color="black" icon="add" class="faSB ft16" 
            rounded @click="onAddObjective" />
        <div class="q-mt-md">
            <template v-if="objectives.length == 0">
                <div class="faSB ft24 shadow-2 q-pa-md text-center">
                    OKR에 설정된 목표가 없습니다.
                </div>
            </template>
            <template v-else>
                <q-bar class="bg-black text-white q-mt-md" style="height: 48px; border-radius: 15px;">
                    <div class="w100p row items-center">
                        <div style="width: 200px;">
                            <span class="text-h6 faSB">OKR 진행도</span>
                        </div>
                        <div style="width: calc( 100% - 300px );">
                            <q-linear-progress :indeterminate="isIndeterminate"  stripe rounded size="30px" 
                                :value="progress1" :buffer="0.1"
                                style="border: 3px solid white;"
                                color="positive" />
                        </div>
                        <div style="width: 100px;" class="faSB text-h6 text-right">
                            {{(progress1 * 100)}}%
                        </div>
                    </div>
                </q-bar>
                <div class="w100p row q-my-md ">
                    
                    <q-space />
                    <q-btn-group>
                        <q-btn :class="viewType=='list'?'bg-black text-white':'bg-white text-black'"
                            @click="viewType='list'"
                            icon="list" />
                        <q-btn :class="viewType=='tree'?'bg-black text-white':'bg-white text-black'"
                            @click="viewType='tree'"
                            icon="account_tree" />
                    </q-btn-group>
                </div>
                <template v-if="viewType==='list'">
                    <listView :objectives="objectives" ref="listView" />
                </template>
                <template v-else-if="viewType==='tree'">
                    <treeView :dataset="dataset" :treeConfig="treeConfig" ref="treeView" />
                </template>
                
            </template>
        </div>
    </div>
    
</template>

<script>

import axios from 'axios';
import treeView from "@/views/workSpace/OKR/treeView.vue";
import listView from "@/views/workSpace/OKR/listView.vue";

export default {
    name: 'workSpaceVue',
    components: {
        treeView,
        listView
    },
    data() {
        return {
            isIndeterminate: true,

            viewType: 'list',
            dataset: {
                value: '',
                children: []
            },
            treeConfig: { nodeWidth: 200, nodeHeight: 80, levelHeight: 200 },
            step: 0,

            workSpaceId: 0,
            workSpace: null,
            OKRId: 0,
            OKR: null,

            okrs: [],
            objectives: [],
            
            // workSpace: null,
            // members: [],
            progress1: 0.1,
        }
    },
    methods: {
        setDataSet() {
            let vm = this;
            vm.dataset = {
                value: '',
                children: [],
            };
            vm.dataset.value = vm.OKR.Title;
            vm.objectives.map((x) => {
                vm.dataset.children.push({
                    value: x.Title,
                });
            });
        },
        onAddObjective() {
            let vm = this;
            vm.$root.$refs.dialog_objective_modify_form.open('add', vm.OKR.OKRId, () => {
                vm.loadData(vm.workSpaceId);
            });
        },
        loadData(workSpaceId, OKRId) {
            let vm = this;
            vm.$q.loading.show();

            axios.all([
                axios.get(`/api/workSpace/${workSpaceId}`, {}),
                axios.get(`/api/workSpace/${workSpaceId}/OKR/${OKRId}`, {}),
                axios.get(`/api/workSpace/${workSpaceId}/OKR/${OKRId}/objectives`, {}),
            ]).then(axios.spread((res1, res2, res3, res4) => {
                let data1 = res1.data;
                if(data1.success) {
                    let workSpace = data1.workSpace;
                    vm.workSpace = workSpace;
                }

                let data2 = res2.data;
                if(data2.success) {
                    let OKR = data2.OKR;
                    vm.isIndeterminate = false;
                    vm.OKR = OKR;
                }
                
                let data3 = res3.data;
                if(data3.success) {
                    let objectives = data3.objectives;
                    if(!objectives) {
                        vm.objectives = [];
                    } else {
                        objectives.map((x) => {
                            x["StartDateView"] = vm.$c.formatDate(new Date(x.StartDate), "date");
                            x["EndDateView"] = vm.$c.formatDate(new Date(x.EndDate), "date");
                        });
                        vm.objectives = objectives;
                    }
                }
                vm.setDataSet();
                vm.$q.loading.hide();
            })).catch((err) => {
                if(err?.response?.status === 403) {
                    vm.$c.response_notify("error", "negative", err.response?.data.message);
                }
                if(err?.response?.status === 404) {
                    vm.$c.response_notify("error", "negative", err?.message);
                }
                vm.$q.loading.hide();
            });
        },
    },
    mounted() {
        let vm = this;
        if(Object.prototype.hasOwnProperty.call(vm.$route.params, "OKRId") == false
            || Object.prototype.hasOwnProperty.call(vm.$route.params, "workSpaceId") == false) {
            vm.$c.response_notify("error", "negative", "잘못된 URL 요청입니다.");
            vm.$router.push("/error");
        }
        vm.OKRId = vm.$route.params.OKRId;
        vm.workSpaceId = vm.$route.params.workSpaceId;
        vm.loadData(vm.workSpaceId, vm.OKRId);
        
        vm.$watch(() => this.$route.params, (newValue, oldValue) => {
            if(Object.prototype.hasOwnProperty.call(vm.$route.params, "OKRId") == false
                || Object.prototype.hasOwnProperty.call(vm.$route.params, "workSpaceId") == false) {
                vm.$q.notify({
                    title: '에러',
                    message: '잘못된 URL 요청입니다.',
                });
                vm.$router.push("/error");
            }

            vm.OKRId = vm.$route.params.OKRId;
            vm.workSpaceId = vm.$route.params.workSpaceId;
            vm.loadData(vm.workSpaceId, vm.OKRId);
        })
    },
}
</script>