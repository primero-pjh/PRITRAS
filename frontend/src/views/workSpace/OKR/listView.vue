<template>
    <div id="listView">
        <div class="w100p">
            <q-list bordered style="border-radius: 15px;" class="bg-grey-4">
                <template v-for="row, idx in objectives" :key="idx">
                    <q-expansion-item  expand-separator default-opened>
                        <template v-slot:header>
                            <q-item-section>
                                <div class="row items-center">
                                    <span class="faB text-h6 q-mr-md">{{ row.Title }}</span>
                                </div>
                            </q-item-section>
                            <q-item-section style="position: relative;">
                                <div v-if="row.ObjectiveManagers" class="q-gutter-sm" style="height: 50px">
                                    <template v-for="manager, m_i in row.ObjectiveManagers" :key="m_i">
                                        <q-avatar size="40px"
                                            style="border: 2px solid white; position: absolute;"
                                            :style="`left: ${m_i * 25}px`">
                                            <q-img :src="$store.state.host + manager.Photo" fit="cover" />
                                            <q-tooltip class="faSB">{{ manager.UserName }}</q-tooltip>
                                        </q-avatar>
                                    </template>
                                </div>
                                <div v-else class="q-gutter-sm row items-center"  style="height: 50px">
                                    <div class="faSB text-body1">담당자가 없습니다.</div>
                                </div>
                            </q-item-section>
                            <q-item-section class="faSB text-body1">
                                <div>시작일 {{ row.StartDateView }}</div>
                                <div>종료일 {{ row.EndDateView }}</div>
                            </q-item-section>
                            <q-item-section side class="faSB text-h6 text-primary">
                                <div>0%</div>
                            </q-item-section>
                        </template>
                        <q-card style="border-top: 2px solid #e3e3e3; border-radius: 0 0 15px 15px;" >
                            <q-card-section>
                                <template v-if="row.KeyResults">
                                    <template v-for="kr, kr_idx in row.KeyResults" :key="kr_idx">
                                        <q-bar class="bg-grey-4 text-black" 
                                            style="height: 52px; border-radius: 15px;">
                                            <div class="faSB text-body1 text-bold">핵심결과 1</div>
                                        </q-bar>
                                    </template>
                                </template>
                                <q-bar class="bg-white text-black" >
                                    <div v-if="!row.AdditingFlag">
                                        <q-btn label="핵심결과 추가" outline class="faSB" icon="add" 
                                            @click="onAdditing(row)"/>
                                    </div>
                                    <div v-else style="width: 100%;">
                                        <div style="width: 100%;">
                                            <div class="row w100p items-center text-black">
                                                <div class="row items-center" style="width: calc(100% - 120px);">
                                                    <div style="width: 100px;" class="faSB text-body1">제목 </div>
                                                    <q-input filled dense label="핵심결과를 입력하세요." class="faSB"
                                                        v-model="keyResult.Title"
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
            keyResult: {
                ObjectiveId: 0,
                Title: '',
                Body: '',
                WriterUID: '',
                Units: '',
                Progress: 0,
                StartDate: '',
                EndDate: '',
            },
            formError: {
                Title: '',
            },
        }
    },
    methods: {
        goto_page(okr) {
            let vm = this;
            vm.$router.push(`/workSpace/${okr.workSpaceId}/OKR/${okr.OKRId}`);
        },
        clearForm() {
            this.keyResult = {
                ObjectiveId: 0,
                Title: '',
                Body: '',
                WriterUID: '',
                Units: '',
                Progress: 0,
                StartDate: '',
                EndDate: '',
            };
        },
        onAdditing(args) {
            let vm = this;
            vm.clearForm();
            args.AdditingFlag = true;
        },  
        onAddKeyResult(args) {
            let vm = this;
            let form_data = vm.keyResult;
            if(!form_data.Title) { form_data.Title = '새 핵심결과'; }
            axios.put(`/api/keyResult`, form_data).then((res) => {
                let data = res.data;
                console.log("data:", data);
            }).catch((err) => {
                if(err?.response?.status === 403) {
                    vm.$c.response_notify("error", "negative", err.response?.data.message);
                }
                if(err?.response?.status === 404) {
                    vm.$c.response_notify("error", "negative", err?.message);
                }
                vm.$q.loading.hide();
            });
            args.AdditingFlag = false;
        },
    },
    mounted() {
        let vm = this;
    },
}
</script>