<template>
    <div id="dialog_okr">
        <q-dialog v-model="isOpen" position="right" full-height ref="ref_dialog_okr">
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
                            <q-input  class="faSB" filled dense v-model="form.title" clearable
                                :error="formError.title?true:false" :error-message="formError.title"
                                placeholder="팀의 목표를 가시화하고 공동의 성과를 투명하고 정확하게 측정하세요."
                                />
                            <div class="text-h6 faSB">기간</div>
                            <div class="row">
                                <q-input v-model="form.start_date" type="date" filled dense style="width: 200px;" class="faSB"
                                :error="formError.start_date?true:false" :error-message="formError.start_date" /> 
                                <span class="faSB">&nbsp;~&nbsp;</span>
                                <q-input v-model="form.end_date" type="date" filled dense style="width: 200px;" class="faSB"
                                :error="formError.end_date?true:false" :error-message="formError.end_date" />
                            </div>
                            
                            <div class="text-h6 faSB">설명</div>
                            <q-editor v-model="form.body" min-height="100" placeholder="설명을 입력해주세요."
                                :error="formError.body?true:false" :error-message="formError.body" />
                        </q-scroll-area>

                    </div>
                </q-card-section>
                <q-separator />
                <q-card-actions align="right">
                    <q-btn class="faSB text-body1" label="닫기" outline v-close-popup />
                    <q-btn class="faSB text-body1" label="OKR 추가" color="primary" @click="onInsert" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import { $c } from "@/utils/common";
import { $winbox } from "@/utils/winbox.util";
import axios from "axios";

export default {
    name: 'dialog_okr',
    computed: {
        account() {
            return this.$store.state.account;
        },
    },
    data() {
        return {
            mode: 'add',
            isOpen: false,

            form: {
                title: '',
                body: '',
                status: '',
                start_date: '',
                end_date: '',
            },
            formError: {},
        }
    },
    methods: {
        /*
        obj : {
            mode,
            work_space_id,
            work_space
        }
        */
        open(obj, callback) {
            let vm = this;
            vm.work_space_id = obj.work_space_id;
            if(obj.mode === 'add') {
                vm.mode = obj.mode;
            }
            if(callback) { vm.callback = callback; }
            vm.isOpen = true;
        },
        onInsert() {
            let vm = this;
            window.$c.form.clearError(vm.formError);
            vm.$q.loading.show();
            let okr = {
                title: vm.form.title,
                body: vm.form.body,
                status: vm.form.status,
                start_date: vm.form.start_date,
                end_date: vm.form.end_date,
                work_space_id: vm.work_space_id,
                writer_uid: vm.$store.state.account.uid,
            }

            axios.post(`/api/okr`, {
                okr: okr,
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
        },

        beforeClose() {
            let vm = this;
            if(vm.form.title || vm.form.start_date || vm.form.body) {
                window.$c.response_notify('', '', '정말 창을 닫으시겠어요?');
            } else {
                vm.onClose();
            }
        },

        onClose() {
            let vm = this;
            vm.isOpen = false;
        },
    },
    mounted() {
        let vm = this;
    }
}
</script>