import EventBus from '@/event-bus';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Front from '@/features/front/Front.vue';
import Histories from '@/features/histories/Histories.vue';
import Rules from '@/features/rules/Rules.vue';
import Cafeteria from '@/features/cafeteria/Cafeteria.vue';
import Parsing from '@/features/parsing/Parsing.vue';
import Login from '@/features/login/Login.vue';
import Notices from '@/features/notices/Notices.vue';
import Versions from '@/features/versions/Versions.vue';
import Questions from '@/features/questions/Questions.vue';
import Logs from '@/features/logs/Logs.vue';

Vue.use(VueRouter);

function createRouter() {
  const routes = [
    {path: '/', component: Front, meta: {authRequired: true}},

    {path: '/Notices', component: Notices, meta: {authRequired: true}},
    {path: '/Logs', component: Logs, meta: {authRequired: true}},
    {path: '/Histories', component: Histories, meta: {authRequired: true}},
    {path: '/Questions', component: Questions, meta: {authRequired: true}},
    {path: '/Rules', component: Rules, meta: {authRequired: true}},
    {path: '/Cafeteria', component: Cafeteria, meta: {authRequired: true}},
    {path: '/Parsing', component: Parsing, meta: {authRequired: true}},
    {path: '/Versions', component: Versions, meta: {authRequired: true}},

    {path: '/login', component: Login},
  ];
  const mode = 'hash';

  return new VueRouter({routes, mode});
}

function addGuard(router) {
  router.beforeEach(async (to, from, next) => {
    const conditionRequiresLogin = routeRequiresAuth(to) && !isLoggedIn();
    const loginPath = '/login';

    if (conditionRequiresLogin) {
      if (from.path === loginPath) {
        console.log('우씨 로그인 필요하다니까!!! 토스트 띄워!!');
        EventBus.$emit('tell-user-that-you-need-to-login');
      } else {
        console.log('로그인하세욧!!!');
        router.push(loginPath);
      }
    } else {
      next();
    }
  });
}

function routeRequiresAuth(route) {
  return route.matched.some(routeInfo => routeInfo.meta.authRequired);
}

function isLoggedIn() {
  return document.cookie.includes('cafeteria-console-server-token');
}

const router = createRouter();

addGuard(router);

export default router;
