import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import homeVue from "@/views/home.vue";
import errorVue from "@/views/error.vue";

import store from "../store";
const routes = [
    /* default-user */
    { path: "/", name: "home", component: homeVue, label: "홈화면", },

    /*error*/
    { path: "/error", name: "error", component: errorVue, label: "404", },
    { path: "/:pathMatch(.*)*", redirect: "/error" },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    next();
});

export default router;