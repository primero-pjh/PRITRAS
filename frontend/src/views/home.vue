<template>
    <div id="homeVue" class="bg-primary" style="height: 100%;">
        <div class="faSB bg-red w100p h100p">
            공지사항(중요사항) 을 알려주는 UI/UX123
            <div style="height: 500px; width: 500px; border: 1px solid red; position: relative;">
                <vue-draggable-resizable :w="100" :h="100" :parent="true">
                    <p>Hello! I'm a flexible component. You can drag me around and you can resize me.</p>
                </vue-draggable-resizable>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: 'homeVue',
    components: {
    },
    computed: {
        host() {
            return this.$store.state.host;
        }
    },
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() {
        let vm = this;
    },
}
</script>