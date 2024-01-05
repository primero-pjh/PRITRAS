<template>
    <div id="listView">
        <div class="w100p">
            <q-list bordered style="border-radius: 15px;" class="bg-white">
                <template v-for="row, idx in okrs" :key="idx">
                    <q-item clickable v-ripple @click="goto_page(row)">
                        <q-item-section>
                            <div class="row items-center">
                                <span class="faB text-h6 q-mr-md">{{ row.Title }}</span>
                                <com_okr_status :OKR="row" ref="com_okr_status" />
                            </div>
                        </q-item-section>
                        <q-item-section>
                        </q-item-section>
                        <q-item-section class="faSB text-body1">
                            <div class="faSB text-body1">
                                시작일 {{ row.StartDateView }}
                            </div>
                            <div class="faSB text-body1">
                                종료일 {{ row.EndDateView }}
                            </div>
                        </q-item-section>
                        <q-item-section avatar>
                            <q-icon color="black" size="2.4em" name="open_in_new" />
                        </q-item-section>
                    </q-item>
                    <q-separator v-if="idx != okrs.length - 1" />
                </template>
            </q-list>
        </div>
    </div>
</template>

<script>
import com_okr_status from "@/components/OKR/com_okr_status.vue"

export default {
    name: 'listView',
    props: ['okrs'],
    components: {
        com_okr_status,
    },
    data() {
        return {
        }
    },
    methods: {
        goto_page(okr) {
            let vm = this;
            vm.$router.push(`/workSpace/${okr.WorkSpaceId}/OKR/${okr.OKRId}`);
        }
    },
    mounted() {
    },
}
</script>