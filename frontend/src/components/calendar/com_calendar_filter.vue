<template>
    <div id="com_calendar_filter" style="height: 100%;" class="shadow-2 bg-white">
        <div class="row q-py-sm q-px-md items-center">
            <div class="faSB text-body1"><span>캘린더 필터</span></div>
            <q-space></q-space>
            <q-btn icon="add" color="positive" dense flat>
                <q-menu>
                    <div class="q-pa-md">
                        <div>
                            <q-input dense label="카테고리" outlined
                                v-model="classification.title"
                                :error="formError.title?true:false"
                                :error-message="formError.title" />
                        </div>
                        <div>
                            <q-color v-model="classification.color" />
                        </div>
                    </div>
                    <q-separator></q-separator>
                    <div style="display: flex; justify-content: end;" class="q-pa-sm">
                        <q-btn label="추가" outline color="positive" 
                            @click="onAddClassification" v-close-popup />
                    </div>
                </q-menu>
            </q-btn>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

export default {
    name: 'com_calendar_filter',
    components: {
    },
    computed: {
    },
    data() {
        return {
            classification: {
                title: '',
                color: '',
            },
            formError: {}
        }
    },
    methods: {
        onAddClassification() {
            let vm = this;
            console.log("onAddClassification");
        }
    },
}
</script>