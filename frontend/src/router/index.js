import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import homeVue from "@/views/home.vue";
import loginVue from "@/views/login.vue";
import errorVue from "@/views/error.vue";

import store from "../store";
const routes = [
    /* default-user */
    { path: "/", name: "홈화면", component: homeVue, },
    { path: "/login", name: "로그인", component: loginVue, },

    /*error*/
    { path: "/error", name: "error", component: errorVue, label: "404", },
    { path: "/:pathMatch(.*)*", redirect: "/error" },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});


export default router;