<template>
    <div id="listView"  class="bg-white">
        <div class="w100p">
            <q-list bordered>
                <template v-for="row, idx in objectives" :key="idx">
                    <q-expansion-item  expand-separator>
                        <template v-slot:header>
                            <q-item-section>
                                <div class="row items-center">
                                    <span class="faB text-h6 q-mr-md">{{ row.Title }}</span>
                                </div>
                            </q-item-section>
                            <q-item-section style="position: relative;">
                                <div class="q-gutter-sm" style="height: 50px">
                                    <q-avatar v-for="n in 5"
                                        :key="n" size="40px"
                                        style="border: 2px solid white; position: absolute;"
                                        :style="`left: ${n * 25}px`">
                                        <q-img :src="`https://cdn.quasar.dev/img/avatar${n + 1}.jpg`" />
                                    </q-avatar>
                                </div>
                            </q-item-section>
                            <q-item-section class="faSB text-body1">
                                {{ row.StartDateView }} ~ {{ row.EndDateView }}
                            </q-item-section>
                            <q-item-section avatar>
                                <q-icon color="black" size="2.4em" name="open_in_new" />
                            </q-item-section>
                        </template>
                    </q-expansion-item>
                    <q-separator />
                </template>
            </q-list>
        </div>
    </div>
</template>

<script>

export default {
    name: 'listView',
    props: ['objectives'],
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
        goto_page(okr) {
            let vm = this;
            vm.$router.push(`/workSpace/${okr.workSpaceId}/OKR/${okr.OKRId}`);
        }
    },
    mounted() {
        
    },
}
</script>