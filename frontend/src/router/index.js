import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import homeVue from "@/views/home.vue";
import loginVue from "@/views/login.vue";
import calendarVue from "@/views/calendar.vue";
import errorVue from "@/views/error.vue";
import okrVue from "@/views/okr.vue";
import settingWorkSpace from "@/views/setting/workSpace.vue";
import workSpaceVue from "@/views/workSpace/index.vue";

const routes = [
    /* default-user */
    { path: "/", name: "home", component: homeVue, 
        meta: { title: '홈화면', hasLogged: false } },
    { path: "/login", name: "login", component: loginVue,
        meta: { title: '로그인', hasLogged: false } },
    { path: "/calendar", name: "calendar", component: calendarVue,
        meta: { title: '캘린더', hasLogged: true } },
    { path: "/okr", name: "okr", component: okrVue,
        meta: { title: 'OKR', hasLogged: true } },
    { path: "/setting/workSpace/:WorkSpaceId", name: "settingWorkSpace", 
        component: settingWorkSpace,
        meta: { title: '워크스페이스-세팅', hasLogged: true } },
        
    { path: "/workSpace/:workSpaceId", name: "workSpace",  component: workSpaceVue,
        meta: { title: '워크스페이스', hasLogged: true } },
    /*error*/
    { path: "/error", name: "error", component: errorVue, label: "404", },
    { path: "/:pathMatch(.*)*", redirect: "/error" },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});


export default router;