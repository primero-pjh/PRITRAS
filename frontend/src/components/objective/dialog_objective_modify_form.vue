<template>
    <div id="dialog_objective_modify_form">
        <q-dialog v-model="isOpen" position="right" full-height>
            <q-card style="width: 600px;" class="column full-height">
                <q-card-section>
                    <div class="row items-center">
                        <div class="text-h6 faSB">새 OKR 추가</div>
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
                            <q-input label="제목" class="faSB" filled dense v-model="form.Title" clearable
                                :error="formError.Title?true:false" :error-message="formError.Title"
                                hint="팀의 목표를 가시화하고 공동의 성과를 투명하고 정확하게 측정하세요."
                                />
                            <q-select
                                filled v-model="managers" :options="appUsers"
                                label="담당자" dense class="faSB"
                                options-selected-class="text-deep-orange" multiple
                                :error="formError.managers?true:false" :error-message="formError.managers" >
                                <template v-slot:selected>
                                    <template v-for="manager, idx in managers" :key="idx">
                                        <q-chip removable @remove="managers.splice(idx, 1)">
                                            <q-avatar>
                                                <q-img :src="$store.state.host + manager.Image" />
                                            </q-avatar>
                                            <span class="faSB text-bold">{{ manager.UserName }}</span>
                                        </q-chip>
                                    </template>
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
                            <div class="row ">
                                <q-input v-model="form.StartDate" type="date" filled dense style="width: 200px;" class="faSB"
                                :error="formError.StartDate?true:false" :error-message="formError.StartDate" /> 
                                &nbsp;
                                ~
                                &nbsp;
                                <q-input v-model="form.EndDate" type="date" filled dense style="width: 200px;" class="faSB"
                                :error="formError.EndDate?true:false" :error-message="formError.EndDate" />
                            </div>
                            
                            <q-editor v-model="form.Body" min-height="100" placeholder="설명을 입력해주세요."
                                :error="formError.Body?true:false" :error-message="formError.Body" />
                        </q-scroll-area>

                    </div>
                </q-card-section>
                <q-separator />
                <q-card-actions align="right">
                    <q-btn label="닫기" outline v-close-popup />
                    <q-btn label="저장" outline color="positive" @click="onSave" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'dialog_objective_modify_form',
    computed: {
        appUsers() {
            return this.$store.state.appUsers;
        },
    },
    data() {
        return {
            mode: 'add',
            isOpen: false,

            form: {
                Title: '',
                Body: '',
                StartDate: '',
                EndDate: '',
            },
            managers: [],
            formError: {
                Title: '',
                managers: '',
                Body: '',
                StartDate: '',
                EndDate: '',
            }
        }
    },
    methods: {
        clearError() {
            this.formError.Title = "";
            this.formError.managers = "";
            this.formError.Body = "";
            this.formError.StartDate = "";
            this.formError.EndDate = "";
        },
        setError(err) {
            this.formError.Title = err?.Title;
            this.formError.managers = err?.managers;
            this.formError.Body = err?.Body;
            this.formError.StartDate = err?.StartDate;
            this.formError.EndDate = err?.EndDate;
        },
        open(mode, objectiveId, callback) {
            let vm = this;
            if(mode == 'add') {
                vm.mode = mode;
            }
            if(callback) { vm.callback = callback; }
            vm.isOpen = true;
        },

        onSave() {
            let vm = this;
            vm.clearError();
            vm.$q.loading.show();
            let objective = {
                Title: vm.form.Title,
                Body: vm.form.Body,
                StartDate: vm.form.StartDate,
                EndDate: vm.form.EndDate,
                WorkSpaceId: 2,
                WriterUID: vm.$store.state.UID,
            }
            axios.post(`/api/objective`, {
                objective,
                managers: vm.managers,
            }).then((res) => {
                let data = res.data;
                vm.$c.response_notify("check", "positive", data.message);
                if(vm.callback) { vm.callback(); }
                vm.isOpen = false;
                vm.$q.loading.hide();
            }).catch((err) => {
                if(err.response.status === 403) {
                    vm.setError(err.response.data.error);
                }
                vm.$q.loading.hide();
            });
        }
    },
    mounted() {
        let vm = this;
    }
}
</script>