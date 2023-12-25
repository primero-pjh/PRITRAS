<template>
    <div id="com_work_space_form">
        <div v-if="mode === 'add'">
            <q-input label="워크스페이스 명" dense filled class="faSB" 
                v-model="workSpace.WorkSpaceName"
                :hint="'50자 이내로 작성해주세요.' + '(' + workSpace.WorkSpaceName.length + '/50)'" 
                :error="formError.WorkSpaceName?true:false" :error-message="formError.WorkSpaceName" />
        </div> 
    </div>
</template>

<script>
export default {
    name: 'com_work_space_form',
    data() {
        return {
            workSpace: {
                WorkSpaceId: 0,
                WorkSpaceName: "",
                Owner: "",
                OwnerUID: "",
            },
            formError: {
                WorkSpaceName: "",
            }
        }
    },
    props: ['mode'],
    methods: {
        getForm() {
            return this.workSpace;
        },
        clearError() {
            let vm = this;
            vm.formError.WorkSpaceName = "";
        },
        setError(error) {
            let vm = this;
            vm.formError.WorkSpaceName = error?.WorkSpaceName;
        },
        onHandleAdd() {
            
        },
    },
    mounted() {
        let vm = this;
    }
}
</script>