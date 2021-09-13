import Vue from 'vue';
import Front from '@/features/front/Front.vue';
import Login from '@/features/login/Login.vue';
import EventBus from '@/event-bus';
import services from '../../services';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

function createRouter() {
  const routes = [
    {path: '/', component: Front, meta: {authRequired: true}},
    {path: '/login', component: Login},

    ...services
      .map(group =>
        group.items.map(item => ({
          path: `/${group.name}/${item.name}`,
          component: item.component,
          meta: {authRequired: true},
        })),
      )
      .flat(),
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
