<template>
    <div id="com_winbox" ref="com_winbox">
        <button @click="open = true">Open</button>

        <Teleport to="body">
            <div v-if="open" class="modal">
                <p>Modal 내용</p>
                <button @click="open = click">Close</button>
            </div>
        </Teleport>
    </div>
</template>

<script>
export default {
    name: 'com_winbox',
    components: {
    },
    computed: {
    },
    data() {
        return {
            open : false,
        }
    },
}
</script>

<style>
.modal {
  position: fixed;
  z-index: 10000;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  background-color: blue;
  color: white;
  transform: translate(-50%, -50%);
}
</style>