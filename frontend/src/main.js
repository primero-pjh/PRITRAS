import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import config from "../package.json"
import { Quasar, Loading, Notify, Dialog } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.css'
import '@/assets/css/common.css'
import VueDraggableResizable from 'vue-draggable-resizable'
import "vue-draggable-resizable/style.css";


import { createI18n } from 'vue-i18n'
import messages from '../lang/index'

import { $c } from './utils/common'

const i18n = createI18n({
    legacy: false,
    locale: 'KO',
    fallbackLocale: 'EN',
    messages,
});

export const app = createApp(App);

window.$c = $c;

import { $winbox } from "./utils/winbox.util"
window.$winbox = $winbox;
// app.config.globalProperties.$c = $c;
app.config.globalProperties.$store = store;
app.config.globalProperties.$config = config;

import axios from "./middleware/axios.middleware"
app.config.globalProperties.$axios = axios;

console.warn(`ybr version: ${config.version}`);
app.use(store);
app.use(i18n);

app.use(Quasar, {
    // components: {
    //     // QWindow,
    // },
    plugins: {
        Loading, Notify, Dialog
    },
    config: {
        loading: { /* look at QuasarConfOptions from the API card */ }
    },
});
app.use(router);

import header_dialog from "@/components/header.dialog.vue"
app.component("header-dialog", header_dialog);
app.component("vue-draggable-resizable", VueDraggableResizable)
// app.component("VueWinBox", VueWinBox);
app.mount('#app');