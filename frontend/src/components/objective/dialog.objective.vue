<template>
    <div id="dialog_objective">
        <q-dialog v-model="isOpen" position="right" full-height>
            <q-card style="width: 600px;" class="column full-height">
                <q-card-section>
                    <div class="row items-center">
                        <div class="text-h6 faSB">새 목표 추가</div>
                        <q-space />
                        <div>
                            <q-btn icon="close" flat round v-close-popup />
                        </div>
                    </div>
                </q-card-section>
                <q-separator />
                <q-card-section class="col">
                    <div style="height: 100%;">
                        <q-scroll-area style="height: 100%; max-width: 100%;" class="q-px-md">
                            <div class="text-h6 faSB text-negative">제목*</div>
                            <q-input label="제목(목표)" class="faSB" filled dense v-model="form.title" clearable
                                :error="formError.title?true:false" :error-message="formError.title"
                                hint="팀의 목표를 가시화하고 공동의 성과를 투명하고 정확하게 측정하세요."
                                />
                            <div class="text-h6 faSB">담당자</div>
                            <q-select
                                filled v-model="managers" :options="company_members"
                                label="담당자" dense class="faSB"
                                options-selected-class="text-deep-orange" multiple
                                :error="formError.managers?true:false" :error-message="formError.managers" >
                                <template v-slot:selected>
                                    <template v-for="manager, idx in managers" :key="idx">
                                        <q-chip removable @remove="managers.splice(idx, 1)">
                                            <q-avatar>
                                                <q-img :src="$store.state.host + manager.Photo" />
                                            </q-avatar>
                                            <span class="faSB text-bold">{{ manager.user_name }}</span>
                                        </q-chip>
                                    </template>
                                </template>
                                <template v-slot:option="scope">
                                    <q-item v-bind="scope.itemProps">
                                        <q-item-section avatar>
                                            <q-img style="width: 40px; height: 40px;" :src="$store.state.host + scope.opt.photo" 
                                                fit="cover"/>
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
                            <div class="text-h6 faSB text-negative">기간*</div>
                            <div class="row">
                                <div>
                                    <q-input v-model="form.start_date" type="date" filled dense style="width: 200px;" class="faSB"
                                    :error="formError.start_date?true:false" :error-message="formError.start_date" /> 
                                </div>
                                <div class="faSB text-body1">
                                    &nbsp;~&nbsp;
                                </div>
                                <div>
                                    <q-input v-model="form.end_date" type="date" filled dense style="width: 200px;" class="faSB"
                                    :error="formError.end_date?true:false" :error-message="formError.end_date" />
                                </div>
                            </div>
                            <div class="text-h6 faSB">설명</div>
                            <q-editor v-model="form.body" min-height="100" placeholder="설명을 입력해주세요."
                                :error="formError.body?true:false" :error-message="formError.body" />
                        </q-scroll-area>

                    </div>
                </q-card-section>
                <q-separator />
                <q-card-actions align="right">
                    <q-btn label="닫기" outline v-close-popup class="faSB" />
                    <q-btn label="저장" outline color="positive" @click="onSave" class="faSB" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'dialog_objective',
    computed: {
        company_members() {
            return this.$store.state.company_members;
        },
    },
    data() {
        return {
            mode: 'add',
            isOpen: false,

            okr_id: 0,
            form: {
                title: '',
                body: '',
                status: 0,
                start_date: '',
                end_date: '',
            },
            formError: {},

            managers: [],
        }
    },
    methods: {
        open(obj, callback) {
            let vm = this;
            if(obj.mode == 'add') {
                vm.mode = obj.mode;
            }
            if(callback) { vm.callback = callback; }
            vm.okr_id = obj.okr_id;
            vm.isOpen = true;
        },

        onSave() {
            let vm = this;
            window.$c.form.clearError(vm.formError);
            let objective = {
                title: vm.form.title,
                body: vm.form.body,
                okr_id: vm.okr_id,
                status: vm.form.status,
                start_date: vm.form.start_date,
                end_date: vm.form.end_date,
                writer_uid: vm.$store.state.account.uid,
            }
            vm.$q.loading.show();
            axios.post(`/api/objective`, {
                objective: objective,
                objective_managers: vm.managers,
            }).then((res) => {
                let response = res.data;
                if(response.status === 200) {
                    window.$c.response_notify("check", "positive", response.message);
                    if(vm.callback) { vm.callback(); }
                    vm.isOpen = false;
                }
                vm.$q.loading.hide();
            }).catch((err) => {
                vm.$q.loading.hide();
                if(err?.response?.status === 400) {
                    let errors = err.response?.data?.data?.errors;
                    window.$c.form.setError(vm.formError, errors);
                }
            });
        }
    },
    mounted() {
        let vm = this;
    }
}
</script>