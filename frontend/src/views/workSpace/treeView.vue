<template>
    <div id="treeView">
        <div style="display: flex;" class="bg-white">
            <vue-tree
                style="width: 800px; height: 600px;" class="shadow-2 q-ma-md"
                :dataset="dataset" :config="treeConfig">
                <template v-slot:node="{ node, collapsed }">
                    <div class="rich-media-node"
                        :style="{ border: collapsed ? '2px solid grey' : '' }">
                        <div>{{ node.value }}</div>
                    </div>
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
    props: ['dataset', 'treeConfig'],
    components: {
        VueTree
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