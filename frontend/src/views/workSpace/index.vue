<template>
    <div id="workSpaceVue" style="height: 100%;">
        {{ WorkSpaceId }}
        <div>
            대충 캘린더
        </div>
        <div>
            대충 okr
        </div>
    </div>
</template>

<script>

// import axios from "axios";

export default {
    name: 'workSpaceVue',
    data() {
        return {
            step: 0,
            WorkSpaceId: 0,
            members: [],
        }
    },
    methods: {
        loadWorkSpace(WorkSpaceId) {
            let vm = this;
            console.log("loadWorkSpace:", WorkSpaceId);
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
        vm.loadWorkSpace(vm.WorkSpaceId);
    },
}
</script>