<template>
    <div id="workSpaceVue" style="height: 100%;">
        <div>
            <q-btn label="OKR 추가" color="black" icon="add" class="faSB ft16" 
                rounded @click="onAddOkr" />
        </div>
        <div>
            <template v-if="okrs.length == 0">
                <div class="faSB ft24">
                    워크스페이스에 OKR이 없습니다. 생성해주세요.
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
                <div class="w100p text-right q-my-md ">
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
                    <listView :okrs="okrs" ref="listView" />
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
import treeView from "@/views/workSpace/treeView.vue";
import listView from "@/views/workSpace/listView.vue";

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
                value: 'root',
                children: [
                    { 
                        value: '2', 
                    },
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
        setDataSet() {
            let vm = this;
            console.log(vm.okrs);
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
                    vm.okrs = okrs;
                    vm.setDataSet();
                    setTimeout(() => { vm.isIndeterminate = false; });
                }
                vm.$q.loading.hide();
            }).catch((err) => {
                console.log("err:", err);
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
            vm.loadOKR(vm.workSpaceId);
        })
    },
}
</script>