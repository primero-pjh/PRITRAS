<template>
    <div id="header-dialog" class="q-pa-md">
        <div class="row items-center">
            <div>
                <slot name="title">
                    <div class="text-h6 faSB">헤더 상단</div>
                </slot>
            </div>
            <q-space />
            <slot name="buttons">
                <div>
                    <q-btn icon="launch" @click="onLoad"></q-btn>
                    <q-btn icon="close" flat v-close-popup />
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'header-dialog',
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() {
        let vm = this;
    }
}
</script>