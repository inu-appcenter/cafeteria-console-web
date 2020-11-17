import VueRouter from 'vue-router';
import Front from '../features/front/Front';
import Vue from 'vue';
import Logs from '@/pages/home/features/logs/Logs';
import Rules from '@/pages/home/features/rules/Rules';
import Cafeteria from '@/pages/home/features/cafeteria/Cafeteria';
import Parsing from '@/pages/home/features/parsing/Parsing';

Vue.use(VueRouter);

function createRouter() {
    const routes = [
        {path: '/', component: Front, meta: {authRequired: true}},

        {path: '/Logs', component: Logs, meta: {authRequired: true}},
        {path: '/Rules', component: Rules, meta: {authRequired: true}},
        {path: '/Cafeteria', component: Cafeteria, meta: {authRequired: true}},
        {path: '/Parsing', component: Parsing, meta: {authRequired: true}}
    ];
    const mode = 'history';

    return new VueRouter({routes, mode});
}

function addGuard(router) {
    router.beforeEach((to, from, next) => {
        const conditionRequireSignIn = !isTestEnv() && routeRequiresAuth(to) && !isLoggedIn();

        if (conditionRequireSignIn) {
            window.location.href = '/auth/sign-in';
        } else {
            next();
        }
    });
}

function routeRequiresAuth(route) {
    return route.matched.some((routeInfo) => routeInfo.meta.authRequired);
}

function isLoggedIn() {
    return document.cookie.includes('cafeteria-management-server-token');
}

function isTestEnv() {
    return process.env.NODE_ENV === 'DEBUG'
}

const router = createRouter();

addGuard(router);

export default router;
