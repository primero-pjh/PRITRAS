<template>
    <div id="listView">
        <div class="w100p">
            <q-list bordered style="border-radius: 15px;" class="bg-grey-4">
                <template v-for="row, idx in objectives" :key="idx">
                    <q-expansion-item  expand-separator default-opened>
                        <template v-slot:header>
                            <q-item-section>
                                <div class="row items-center">
                                    <span class="faB text-h6 q-mr-md">{{ row.title }}</span>
                                </div>
                            </q-item-section>
                            <q-item-section style="position: relative;">
                                <div v-if="row.objective_managers.length > 0" class="q-gutter-sm" style="height: 50px">
                                    <template v-for="manager, m_i in row.objective_managers" :key="m_i">
                                        <q-avatar size="40px"
                                            style="border: 2px solid white; position: absolute;"
                                            :style="`left: ${m_i * 25}px`">
                                            <q-img :src="$store.state.host + manager.photo" fit="cover" />
                                            <q-tooltip class="faSB">{{ manager.user_name }}</q-tooltip>
                                        </q-avatar>
                                    </template>
                                </div>
                                <div v-else class="q-gutter-sm row items-center"  style="height: 50px">
                                    <div class="faSB text-body1">담당자가 없습니다.</div>
                                </div>
                            </q-item-section>
                            <q-item-section class="faSB text-body1">
                                <div>시작일 {{ row.start_date_view }}</div>
                                <div>종료일 {{ row.end_date_view }}</div>
                            </q-item-section>
                            <q-item-section side class="faSB text-h6 text-primary">
                                <div>0%</div>
                            </q-item-section>
                        </template>
                        <q-card style="border-top: 2px solid #e3e3e3; border-radius: 0 0 15px 15px;" >
                            <q-card-section>
                                <template v-if="row.key_results">
                                    <template v-for="kr, kr_idx in row.key_results" :key="kr_idx">
                                        <q-bar class="bg-grey-4 text-black q-mb-sm" 
                                            style="height: 52px; border-radius: 15px;">
                                            <div class="faSB text-body1 text-bold">{{ kr.title }}</div>
                                            <q-space />
                                            <div class="faSB text-body1">{{ kr.progress }}%</div>
                                        </q-bar>
                                    </template>
                                </template>
                                <q-bar class="bg-white text-black" >
                                    <div v-if="!row.AdditingFlag">
                                        <q-btn label="핵심결과 추가" outline class="faSB" icon="add" 
                                            @click="onAdditing(row)" />
                                    </div>
                                    <div v-else style="width: 100%;">
                                        <div style="width: 100%;">
                                            <div class="row w100p items-center text-black">
                                                <div class="row items-center" style="width: calc(100% - 120px);">
                                                    <div style="width: 100px;" class="faSB text-body1">제목 </div>
                                                    <q-input filled dense label="핵심결과를 입력하세요." class="faSB"
                                                        v-model="key_result.title"
                                                        style="width: calc(100% - 200px);" @keyup.enter="onAddKeyResult(row)" />
                                                </div>
                                                <q-space></q-space>
                                                <div>
                                                    <q-btn label="취소" class="q-mr-sm faSB" @click="row.AdditingFlag=!row.AdditingFlag" />
                                                    <q-btn label="생성" class="faSB" color="positive" @click="onAddKeyResult(row)" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </q-bar>
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>
                    <q-separator v-if="idx != objectives.length - 1" />
                </template>
            </q-list>
        </div>
    </div>
</template>

<script>

import axios from "axios"

export default {
    name: 'listView',
    props: ['objectives'],
    components: {
    },
    data() {
        return {
            key_result: {
                objective_id: 0,
                title: '',
                body: '',
                writer_uid: '',
                units: '',
                progress: 0,
                start_date: '',
                end_date: '',
            },
            formError: {},
        }
    },
    methods: {
        goto_page(okr) {
            let vm = this;
            vm.$router.push(`/work-space/${okr.work_space_id}/OKR/${okr.okr_id}`);
        },
        clearForm() {
            this.key_result = {
                objective_id: 0,
                title: '',
                body: '',
                writer_uid: '',
                units: '',
                progress: 0,
                start_date: '',
                end_date: '',
            };
        },
        onAdditing(args) {
            let vm = this;
            vm.clearForm();
            args.AdditingFlag = true;
        },  
        onAddKeyResult(args) {
            let vm = this;
            let form_data = vm.key_result;
            if(!form_data.title) { form_data.title = '새 핵심결과'; }
            form_data.objective_id = args.objective_id;
            form_data.writer_uid = vm.$store.state.account.uid;

            let work_space_id = vm.$route.params['work_space_id'];
            let okr_id = vm.$route.params['okr_id'];

            axios.post(`/api/key-result`, {
                key_result: form_data,
                key_result_managers: [],
            }).then((res) => {
                let response = res.data;
                if(response.status === 200) {
                    window.$c.response_notify("check", "positive", response.message);
                    vm.$emit("loadData", work_space_id, okr_id);
                }
            }).catch((err) => {
                vm.$q.loading.hide();
                if(err?.response?.status === 400) {
                    let errors = err.response?.data?.data?.errors;
                    window.$c.form.setError(vm.formError, errors);
                }
            });
            args.AdditingFlag = false;
        },
    },
    mounted() {
        let vm = this;
        
    },
}
</script>