import VueRouter from 'vue-router';
import Front from '../features/front/Front';
import Vue from 'vue';
import Logs from '@/features/logs/Logs';
import Rules from '@/features/rules/Rules';
import Cafeteria from '@/features/cafeteria/Cafeteria';
import Parsing from '@/features/parsing/Parsing';
import SignIn from '@/features/signin/SignIn';
import EventBus from '@/event-bus';

Vue.use(VueRouter);

function createRouter() {
    const routes = [
        {path: '/', component: Front, meta: {authRequired: true}},

        {path: '/Logs', component: Logs, meta: {authRequired: true}},
        {path: '/Rules', component: Rules, meta: {authRequired: true}},
        {path: '/Cafeteria', component: Cafeteria, meta: {authRequired: true}},
        {path: '/Parsing', component: Parsing, meta: {authRequired: true}},

        {path: '/sign-in', component: SignIn},
    ];
    const mode = 'hash';

    return new VueRouter({routes, mode});
}

function addGuard(router) {
    router.beforeEach(async (to, from, next) => {
        const conditionRequireSignIn = routeRequiresAuth(to) && !isLoggedIn();
        const signInRoute = '/sign-in';

        if (conditionRequireSignIn) {
            if (from.path === signInRoute) {
                console.log('우씨 로그인 필요하다니까!!! 토스트 띄워!!');
                EventBus.$emit('tell-user-that-you-need-to-sign-in');
            } else {
                console.log('로그인하세욧!!!');
                router.push(signInRoute);
            }
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

const router = createRouter();

addGuard(router);

export default router;
