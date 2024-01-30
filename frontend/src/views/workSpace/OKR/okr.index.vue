<template>
    <div id="okrIndexVue" style="height: 100%;">
        <div class="bg-black text-white q-mb-md" style="border-radius: 5px;">
            <q-toolbar>
                <q-breadcrumbs class="faSB text-h6">
                    <q-breadcrumbs-el class="text-white" label="워크스페이스" />
                    <q-breadcrumbs-el v-if="work_space" class="text-primary" 
                        @click="$router.push(`/work-space/${work_space.work_space_id}`)"
                        :label="work_space.work_space_name" style="cursor: pointer;"/>
                    <q-breadcrumbs-el v-if="okr" class="text-white" :label="okr.title" />
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
import treeView from "@/views/workSpace/okr/okr.treeView.vue";
import listView from "@/views/workSpace/okr/okr.listView.vue";

export default {
    name: 'okrIndexVue',
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

            work_space_id: 0,
            work_space: null,
            okr_id: 0,
            okr: null,

            okrs: [],
            objectives: [],
            
            progress1: 0.0,
        }
    },
    methods: {
        setDataSet() {
            let vm = this;
            vm.dataset = {
                value: '',
                children: [],
            };
            vm.dataset.value = vm.okr.title;
            vm.objectives.map((x) => {
                vm.dataset.children.push({
                    value: x.title,
                });
            });
        },
        onAddObjective() {
            let vm = this;
            vm.$root.$refs.dialog_objective_modify_form.open('add', vm.okr.okr_id, () => {
                vm.loadData(vm.work_space_id);
            });
        },
        loadData(work_space_id, okr_id) {
            let vm = this;
            vm.$q.loading.show();
            axios.all([
                axios.get(`/api/work-space/${work_space_id}`, {}),
                axios.get(`/api/okr/${okr_id}`, {}),
                axios.get(`/api/objective/okr/${okr_id}`, {}),
            ]).then(axios.spread((res1, res2, res3) => {
                let response1 = res1.data;
                if(response1.status === 200) {
                    let work_space = response1.data;
                    vm.work_space = work_space;
                }

                let response2 = res2.data;
                if(response2.status === 200) {
                    let okr = response2.data;
                    vm.isIndeterminate = false;
                    vm.okr = okr;
                }
                
                let response3 = res3.data;
                if(response3.status === 200) {
                    let objectives = response3.data;
                    console.log("objectives:", objectives);
                    objectives.map((x) => {
                        x["start_date_view"] = window.$c.formatDate(x.start_date, "YYYY-MM-DD");
                        x["end_date_view"] = window.$c.formatDate(x.end_date, "YYYY-MM-DD");
                        x["AdditingFlag"] = false;// listView.vue에서 사용(핵심결과 추가의 flag)
                    });
                    vm.objectives = objectives;
                }
                vm.setDataSet();// treeview 설정
                vm.$q.loading.hide();
            })).catch((err) => {
                vm.$q.loading.hide();
            });
        },
    },
    mounted() {
        let vm = this;
        if(Object.prototype.hasOwnProperty.call(vm.$route.params, "okr_id") == false
            || Object.prototype.hasOwnProperty.call(vm.$route.params, "work_space_id") == false) {
            vm.$c.response_notify("error", "negative", "잘못된 URL 요청입니다.");
            vm.$router.push("/error");
        }
        vm.okr_id = vm.$route.params.okr_id;
        vm.work_space_id = vm.$route.params.work_space_id;
        vm.loadData(vm.work_space_id, vm.okr_id);
        
        vm.$watch(() => this.$route.params, (newValue, oldValue) => {
            if(Object.prototype.hasOwnProperty.call(vm.$route.params, "okr_id") == false
                || Object.prototype.hasOwnProperty.call(vm.$route.params, "work_space_id") == false) {
                vm.$q.notify({
                    title: '에러',
                    message: '잘못된 URL 요청입니다.',
                });
                vm.$router.push("/error");
            }

            vm.okr_id = vm.$route.params.okr_id;
            vm.work_space_id = vm.$route.params.work_space_id;
            vm.loadData(vm.work_space_id, vm.okr_id);
        });
    },
}
</script>