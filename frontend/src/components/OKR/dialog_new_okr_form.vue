<template>
    <div id="dialog_new_okr_form">
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
                            <div class="text-h6 faSB">OKR 제목</div>
                            <q-input  class="faSB" filled dense v-model="form.Title" clearable
                                :error="formError.Title?true:false" :error-message="formError.Title"
                                placeholder="팀의 목표를 가시화하고 공동의 성과를 투명하고 정확하게 측정하세요."
                                />
                            <div class="text-h6 faSB">기간</div>
                            <div class="row">
                                <q-input v-model="form.StartDate" type="date" filled dense style="width: 200px;" class="faSB"
                                :error="formError.StartDate?true:false" :error-message="formError.StartDate" /> 
                                <span class="faSB">&nbsp;~&nbsp;</span>
                                <q-input v-model="form.EndDate" type="date" filled dense style="width: 200px;" class="faSB"
                                :error="formError.EndDate?true:false" :error-message="formError.EndDate" />
                            </div>
                            
                            <div class="text-h6 faSB">설명</div>
                            <q-editor v-model="form.Body" min-height="100" placeholder="설명을 입력해주세요."
                                :error="formError.Body?true:false" :error-message="formError.Body" />
                        </q-scroll-area>

                    </div>
                </q-card-section>
                <q-separator />
                <q-card-actions align="right">
                    <q-btn class="faSB text-body1" label="닫기" outline v-close-popup />
                    <q-btn class="faSB text-body1" label="OKR 추가" color="primary" @click="onSave" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'dialog_new_okr_form',
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
                Status: '',
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
        open(mode, okrId, callback) {
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
            let okr = {
                Title: vm.form.Title,
                Body: vm.form.Body,
                Status: vm.form.Status,
                StartDate: vm.form.StartDate,
                EndDate: vm.form.EndDate,
                WorkSpaceId: 2,
                WriterUID: vm.$store.state.UID,
            }
            axios.post(`/api/okr`, {
                okr,
            }).then((res) => {
                let data = res.data;
                vm.$c.response_notify("check", "positive", data.message);
                if(vm.callback) { vm.callback(); }
                vm.isOpen = false;
                vm.$q.loading.hide();
            }).catch((err) => {
                if(err?.response?.status === 403) {
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