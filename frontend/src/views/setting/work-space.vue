<template>
    <div id="workSpaceSettingVue" style="height: 100%;">
        <div class="text-h4 text-center faSB q-my-sm">
            워크스페이스 생성
        </div>
        <div>
            <q-stepper v-model="step" ref="stepper" :keep-alive="true"
                alternative-labels color="primary" animated >
                <q-step :name="0" title="기본 정보를 입력하세요."
                    icon="settings" :done="step > 0">
                    <com_work_space_form mode="add" ref="com_work_space_form" />
                </q-step>
                <q-step :name="1" title="구성원을 선택하세요."
                    icon="people" :done="step > 1">
                    <q-select
                        filled v-model="select_members" :options="company_members" label="구성원" dense
                        options-selected-class="text-deep-orange" multiple>
                        <template v-slot:selected>
                        </template>
                        <template v-slot:option="scope">
                            <q-item v-bind="scope.itemProps">
                                <q-item-section avatar>
                                    <q-img :src="$store.state.host + scope.opt.photo" fit="cover" 
                                        style="width: 40px; height: 40px;" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label class="faSB">
                                        {{ scope.opt.user_name }}
                                    </q-item-label>
                                    <q-item-label caption>{{ scope.opt.phone_number }}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </template>
                        <template v-slot:no-option>
                            <q-item>
                                <q-item-section class="faSB text-grey">등록된 구성원이 없습니다.</q-item-section>
                            </q-item>
                        </template>
                    </q-select>
                    <div v-if="select_members.length == 0" class="faSB q-mt-md q-pl-sm">선택된 구성원이 없습니다. 구성원을 선택해주세요.</div>
                    <div v-else class="faSB q-mt-md q-pl-sm">: 선택된 구성원 : {{ select_members.length }}명 </div>
                    <template v-for="member, idx in select_members" :key="idx">
                        <q-chip removable @remove="select_members.splice(idx, 1)">
                            <q-avatar>
                                <q-img :src="$store.state.host + member.photo" />
                            </q-avatar>
                            <span class="faSB text-bold">{{ member.user_name }}</span>
                        </q-chip>
                        <br/>
                    </template>
                </q-step>
                <q-step :name="2" title="워크스페이스 확인"
                    icon="preview" :done="step == 2">
                    <div class="text-h6 text-center">
                        워크스페이스를 생성하였습니다.
                    </div>
                </q-step>
                
                <template v-slot:navigation>
                    <q-separator class="q-my-md" />
                    <q-stepper-navigation>
                        <q-btn v-if="step == 1" color="primary" outline
                            @click="$refs.stepper.previous()" label="이전단계"
                            icon="chevron_left" class="q-mr-sm" />
                        <q-btn @click="nextStep" color="primary" v-if="step == 0"
                            icon="navigate_next" label="다음단계" class="q-mr-sm" outline />
                        <q-btn @click="onInsert" color="positive" v-if="step == 1"
                            icon="check" label="생성하기" outline />

                        <template v-if="step == 2" >
                            <q-btn color="primary" v-if="step == 2" class="q-mr-sm" @click="$router.push('/')"
                                label="홈화면으로 이동" outline>
                            </q-btn>
                            <q-btn color="primary" v-if="step == 2" @click="$router.push(`/work-space/${work_space_id}`)"
                                label="워크스페이스로 이동" outline>
                            </q-btn>
                        </template>
                    </q-stepper-navigation>
                </template>
            </q-stepper>
        </div>
    </div>
</template>

<script>

import axios from "axios";
import com_work_space_form from "@/components/workSpace/com_work_space_form.vue";

export default {
    name: 'okrVue',
    components: {
        com_work_space_form,
    },
    computed: {
        host() {
            return this.$store.state.host;
        },
        company_members() {
            return this.$store.state.company_members;
        },
    },
    data() {
        return {
            step: 0,
            work_space_id: 0,
            select_members: [],
        }
    },
    methods: {
        check_duplication_name(form) {
            let vm = this;
            
        },
        nextStep() {
            let vm = this;
            vm.$refs.com_work_space_form.clearError();

            let is_continue = vm.$refs.com_work_space_form.validation();
            if(is_continue) {
                vm.step++;
            } else { 
                return;
            }
        },
        onInsert() {
            let vm = this;
            vm.$q.loading.show();
            let ws = vm.$refs.com_work_space_form.getForm();

            ws["company_code"] = vm.$store.state.account.company_code;
            ws["owner"] = vm.$store.state.account.user_name;
            ws["owner_uid"] = vm.$store.state.account.uid;
            
            axios.post(`/api/work-space`, {
                work_space: ws,
                work_space_members: vm.select_members,
            }).then((res) => {
                let response = res.data;
                vm.work_space_id = response.data;
                // 0. step up
                vm.step++;
                // 1. store의 워크스페이스 reload
                vm.$store.commit("onLoadUserOfWorkSpaces");
                vm.$q.loading.hide();
            }).catch((err) => {
                vm.$q.loading.hide();
                // bad_request : validation error
                if(err?.response?.status === 400) {
                    let errors = err?.response?.data?.data?.errors;
                    vm.$refs.com_work_space_form.setError(errors);
                    vm.step = 0;
                } else {
                    window.$c.response_notify("error", "negative", err.message);
                }
            });
        },
    },
    beforeMount() {
        let vm = this;
        if(Object.prototype.hasOwnProperty.call(vm.$route.params, "work_space_id") == false) {
            this.$q.notify({
                title: '에러',
                message: '잘못된 URL 요청입니다.',
            });
            vm.$router.push("/error");
        }
        vm.work_space_id = vm.$route.params.work_space_id;
    },
    mounted() {
        
    },
}
</script>