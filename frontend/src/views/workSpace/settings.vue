<template>
    <div id="workSpaceSettingVue" style="height: 100%;">
        <div>
            <q-stepper v-model="step" ref="stepper" 
                alternative-labels color="primary" animated >
                <q-step :name="0" title="기본 정보를 입력하세요."
                    icon="settings" :done="step > 0">
                    <com_work_space_form mode="add" ref="com_work_space_form" />
                </q-step>
                <q-step :name="1" title="구성원을 선택하세요."
                    icon="people" :done="step > 1">
                    <q-select
                        filled
                        v-model="model"
                        :options="options"
                        label="Standard"
                        dense
                        options-selected-class="text-deep-orange"
                    >
                        <template v-slot:option="scope">
                        <q-item v-bind="scope.itemProps">
                            <q-item-section avatar>
                            <q-icon :name="scope.opt.icon" />
                            </q-item-section>
                            <q-item-section>
                            <q-item-label>{{ scope.opt.label }}</q-item-label>
                            <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                            </q-item-section>
                        </q-item>
                        </template>
                    </q-select>
                </q-step>

                
                <template v-slot:navigation>
                    <q-separator class="q-my-md" />
                    <q-stepper-navigation>
                        <q-btn v-if="step >= 1" color="primary" outline
                            @click="$refs.stepper.previous()" label="이전단계" 
                            icon="chevron_left" class="q-mr-sm" />
                        <q-btn @click="$refs.stepper.next()" color="primary" v-if="step != 1"
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
        }
    },
    data() {
        return {
            step: 1,
            WorkSpaceId: 0,
            users: [],
        }
    },
    methods: {
        onSave() {
            let vm = this;
            console.log("onSave");
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