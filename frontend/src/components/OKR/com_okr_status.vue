<template>
    <div id="com_okr_status">
        <q-chip color="black" text-color="white">
            <template v-if="OKR.Status == 0">
                <span class="faSB q-mr-sm">대기중</span>
                <q-badge rounded color="yellow" />
            </template>
            <template v-else-if="OKR.Status == 1">
                <span class="faSB q-mr-sm">진행중</span>
                <q-badge rounded color="positive" />            
            </template>
            <template v-else-if="OKR.Status == 2">
                <span class="faSB q-mr-sm">마감</span>
                <q-badge rounded color="negative" />            
            </template>
        </q-chip>
    </div>
</template>

<script>
export default {
    name: 'com_okr_status',
    props: ['OKR'],
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