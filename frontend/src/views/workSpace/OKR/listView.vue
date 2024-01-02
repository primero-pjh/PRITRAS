<template>
    <div id="listView"  class="bg-white">
        <div class="w100p">
            <q-list bordered>
                <template v-for="row, idx in objectives" :key="idx">
                    <q-expansion-item  expand-separator default-opened>
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
                        </template>
                        <q-card style="border-top: 2px solid #e3e3e3;" >
                            <q-card-section>
                                <q-bar class="bg-black text-white" 
                                    style="height: 52px; border-radius: 15px;">
                                    <div class="faSB text-body1">핵심결과 1</div>
                                </q-bar>
                                <q-bar class="bg-black text-white q-mt-sm"
                                    style="height: 52px; border-radius: 15px;">
                                    <div class="faSB text-body1">핵심결과 2</div>
                                </q-bar>
                            </q-card-section>
                        </q-card>
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
        let vm = this;
        console.log("objectives:", vm.objectives);
    },
}
</script>