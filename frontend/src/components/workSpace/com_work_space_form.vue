<template>
    <div id="com_work_space_form">
        <div v-if="mode === 'add'">
            <q-input label="워크스페이스 명" dense filled class="faSB" 
                v-model="work_space.work_space_name"
                :hint="'50자 이내로 작성해주세요.' + '(' + work_space.work_space_name.length + '/50)'" 
                :error="formError.work_space?.work_space_name?true:false" :error-message="formError.work_space?.work_space_name" 
                
                />
        </div> 
    </div>
</template>

<script>
export default {
    name: 'com_work_space_form',
    data() {
        return {
            work_space: {
                work_space_id: 0,
                work_space_name: "",
                company_code: "",
                photo: "",
                owner: "",
                owner_uid: "",
            },
            formError: {
                work_space: {},
            }
        }
    },
    props: ['mode'],
    methods: {
        validation() {
            let vm = this;
            if(!vm.work_space.work_space_name) {
                vm.formError.work_space.work_space_name = vm.$t('form.require');
                return false;
            }
            if(vm.work_space.work_space_name.length > 50) {
                vm.formError.work_space.work_space_name = "50자 이내로 작성해주세요.";
                return false;
            }
            return true;
        },
        getForm() {
            return this.work_space;
        },
        clearError() {
            let vm = this;
            vm.formError.work_space = new Object();
        },
        setError(errors) {
            let vm = this;
            window.$c.form.setError(vm.formError, errors);
        },
    },
    mounted() {
        let vm = this;
    }
}
</script>