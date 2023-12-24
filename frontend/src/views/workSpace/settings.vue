<template>
    <div id="workSpaceSettingVue" style="height: 100%;">
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
                        filled v-model="members" :options="appUsers" label="구성원" dense
                        options-selected-class="text-deep-orange" multiple>
                        <template v-slot:selected>
                        </template>
                        <template v-slot:option="scope">
                            <q-item v-bind="scope.itemProps">
                                <q-item-section avatar>
                                    <q-img :src="$store.state.host + scope.opt.Image" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label class="faSB">
                                        {{ scope.opt.UserName }}
                                    </q-item-label>
                                    <q-item-label caption>{{ scope.opt.PhoneNumber }}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </template>
                        <template v-slot:no-option>
                            <q-item>
                                <q-item-section class="faSB text-grey">등록된 구성원이 없습니다.</q-item-section>
                            </q-item>
                        </template>
                    </q-select>
                    <div v-if="members.length == 0" class="faSB q-mt-md q-pl-sm">선택된 구성원이 없습니다. 구성원을 선택해주세요.</div>
                    <div v-else class="faSB q-mt-md q-pl-sm">: 선택된 구성원 : {{ members.length }}명 </div>
                    <template v-for="member, idx in members" :key="idx">
                        <q-chip removable @remove="members.splice(idx, 1)">
                            <q-avatar>
                                <q-img :src="$store.state.host + member.Image" />
                            </q-avatar>
                            <span class="faSB text-bold">{{ member.UserName }}</span>
                        </q-chip>
                        <br/>
                    </template>
                </q-step>

                
                <template v-slot:navigation>
                    <q-separator class="q-my-md" />
                    <q-stepper-navigation>
                        <q-btn v-if="step >= 1" color="primary" outline
                            @click="$refs.stepper.previous()" label="이전단계" 
                            icon="chevron_left" class="q-mr-sm" />
                        <q-btn @click="nextStep" color="primary" v-if="step != 1"
                            icon="navigate_next" label="다음단계" class="q-mr-sm" outline />
                        <q-btn @click="onSave" color="positive" v-if="step == 1"
                            icon="check" label="저장하기" outline />
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
        appUsers() {
            return this.$store.state.appUsers;
        },
    },
    data() {
        return {
            step: 0,
            WorkSpaceId: 0,
            members: [],
        }
    },
    methods: {
        nextStep() {
            let vm = this;
            vm.$refs.com_work_space_form.clearError();
            let form = vm.$refs.com_work_space_form.getForm();
            if(!form.WorkSpaceName) {
                vm.$refs.com_work_space_form.setError({
                    WorkSpaceName: "필수입력 항목입니다.",
                });
                return;
            }
            vm.step++;
        },
        onSave() {
            let vm = this;
            vm.$q.loading.show();
            let ws = vm.$refs.com_work_space_form.getForm();
            axios.post(`/api/workSpace`, {
                WorkSpace: ws,
                Members: vm.members,
            }).then((res) => {
                let data = res.data;
                if(data.success) {
                    vm.$c.response_notify('check', 'positive', data.message);
                    vm.$router.push(`/workSpace/${data.workSpaceId}`);
                }
                vm.$q.loading.hide();
            }).catch((err) => {
                vm.$q.loading.hide();
            });
        },
    },
    mounted() {
        let vm = this;
        if(Object.prototype.hasOwnProperty.call(vm.$route.params, "WorkSpaceId") == false) {
            this.$q.notify({
                title: '에러',
                message: '잘못된 URL 요청입니다.',
            });
            vm.$router.push("/error");
        }
        vm.WorkSpaceId = vm.$route.params.WorkSpaceId;
    },
}
</script>