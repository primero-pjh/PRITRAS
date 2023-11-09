import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import homeVue from "@/views/home.vue";
import loginVue from "@/views/login.vue";
import calendarVue from "@/views/calendar.vue";
import errorVue from "@/views/error.vue";

const routes = [
    /* default-user */
    { path: "/", name: "home", component: homeVue, 
        meta: { title: '홈화면', hasLogged: false } },
    { path: "/login", name: "login", component: loginVue,
        meta: { title: '로그인', hasLogged: false } },
    { path: "/calendar", name: "calendar", component: calendarVue,
        meta: { title: '캘린더', hasLogged: true } },

    /*error*/
    { path: "/error", name: "error", component: errorVue, label: "404", },
    { path: "/:pathMatch(.*)*", redirect: "/error" },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});


export default router;