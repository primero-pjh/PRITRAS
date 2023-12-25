<template>
    <div id="workSpaceVue" style="height: 100%;">
        <div>
            <q-btn label="OKR 추가" color="black" icon="add" class="faSB ft16" rounded @click="onAddObjective" />
        </div>
        <div>
            <template v-if="!objectives">
                <div class="faSB ft24">
                    워크스페이스에 OKR이 없습니다. 생성해주세요.
                </div>
            </template>
            <template v-else>
                <q-bar>
                    <div>
                        OKR 진행도

                    </div>
                </q-bar>
                <template v-for="row, idx in objectives" :key="idx">
                    {{ row.Title }}
                </template>
            </template>
        </div>
    </div>
</template>

<script>
import axios from 'axios';


// import axios from "axios";

export default {
    name: 'workSpaceVue',
    data() {
        return {
            step: 0,
            workSpaceId: 0,
            workSpace: null,
            objectives: null,
            members: [],
        }
    },
    methods: {
        onAddObjective() {
            let vm = this;
            vm.$root.$refs.dialog_objective_modify_form.open('add', 0, () => {
                vm.loadWorkSpace(vm.workSpaceId);
            });
        },
        loadWorkSpace(workSpaceId) {
            let vm = this;
            vm.$q.loading.show();
            axios.get(`/api/objective/${workSpaceId}`, {

            }).then((res) => {
                let data = res.data;
                if(data.success) {
                    let objectives = data.objectives;
                    vm.objectives = objectives;
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
        vm.loadWorkSpace(vm.workSpaceId);
        
        vm.$watch(() => this.$route.params, (newValue, oldValue) => {
            if(Object.prototype.hasOwnProperty.call(vm.$route.params, "workSpaceId") == false) {
                vm.$q.notify({
                    title: '에러',
                    message: '잘못된 URL 요청입니다.',
                });
                vm.$router.push("/error");
            }

            vm.workSpaceId = vm.$route.params.workSpaceId;
            vm.loadWorkSpace(vm.workSpaceId);
        })
    },
}
</script>