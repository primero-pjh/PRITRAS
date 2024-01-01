<template>
    <div id="treeView">
        <div style="display: flex;" class="bg-white">
            <vue-tree style="width: 800px; height: 600px;" class="shadow-2 q-ma-md"
                :dataset="dataset" :config="treeConfig">
                <template v-slot:node="{ node, collapsed }">
                    <template v-if="node.hasOwnProperty('children')">
                        <div>
                            <q-card style="width: 300px;">
                                <q-card-section>
                                    <div class="faB text-h6">{{ node.value }}</div>
                                </q-card-section>
                                <q-card-section>
                                    <div class="faSB text-body1">2024-01-02 - 2024-01-30</div>
                                </q-card-section>
                            </q-card>
                        </div>
                    </template>
                    <template v-else>
                        <div :style="{ border: collapsed ? '2px solid grey' : '' }">
                            <q-card>
                                <q-card-section>
                                    <div class="faSB text-h6">{{ node.value }}</div>
                                </q-card-section>
                            </q-card>
                        </div>
                    </template>
                </template>
            </vue-tree>
        </div>
    </div>
</template>

<script>

import VueTree from "@ssthouse/vue3-tree-chart";
import "@ssthouse/vue3-tree-chart/dist/vue3-tree-chart.css";

export default {
    name: 'treeView',
    props: ['OKR', 'objectives', 'dataset', 'treeConfig'],
    components: {
        VueTree,
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