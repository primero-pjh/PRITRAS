<template>
    <div id="listView"  class="bg-white">
        <div class="w100p">
            <q-list bordered class="rounded-borders">
                <template v-for="row, idx in okrs" :key="idx">
                    <q-expansion-item expand-separator>
                        <template v-slot:header>
                            <q-item-section avatar style="width: 50%;">
                                <span class="text-h6 faSB">{{ row.Title }}</span>
                            </q-item-section>

                            <q-item-section>
                                Bluetooth technology
                            </q-item-section>

                            <q-item-section side>
                                <div class="row items-center text-h6 faSB">
                                    0%
                                </div>
                            </q-item-section>
                        </template>
                        <q-card>
                            <q-card-section>
                                <template v-if="row.keyResults?.length == 0">
                                    <div class="faSB text-h6">
                                        아직 핵심결과가 지정이 안됐어요! 
                                    </div>
                                </template>
                                <template v-else>
                                    <template v-for="row, idx2 in row.keyResults" :key="idx2">
                                        <q-list bordered class="rounded-borders">
                                            <q-item>
                                                <q-item-section>
                                                    안녕
                                                </q-item-section>
                                            </q-item>
                                        </q-list>
                                    </template>
                                </template>
                                
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>
                </template>
            </q-list>
        </div>
    </div>
</template>

<script>

export default {
    name: 'listView',
    props: ['okrs'],
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() {
    },
}
</script>