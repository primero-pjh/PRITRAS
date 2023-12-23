<template>
    <div id="com_work_space_form">
        <div>
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
                WorkSpaceId: "",
                WorkSpaceName: "",
                Owner: "",
                OwnerUID: "",
            }
        }
    },
    props: ['mode'],
    methods: {
        onHandleAdd() {
            
        },
    },
    mounted() {
        let vm = this;
        console.log('mode', vm.mode);
    }
}
</script>