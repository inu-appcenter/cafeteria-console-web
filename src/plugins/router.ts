/**
 * This file is part of INU Cafeteria.
 *
 * Copyright 2022 INU Global App Center <potados99@gmail.com>
 *
 * INU Cafeteria is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * INU Cafeteria is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import Vue from 'vue';
import Front from '@/features/front/Front.vue';
import Login from '@/features/login/Login.vue';
import EventBus from '@/event-bus';
import services from '../../services';
import VueRouter from 'vue-router';
import {isFuture} from 'date-fns';
import {getCookie} from '@/utils/cookie';
import JWT, {JwtPayload} from 'jsonwebtoken';

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
  const jwt = getCookie('cafeteria-console-server-token');

  if (jwt == null) {
    return false;
  }

  const decoded = JWT.decode(jwt) as JwtPayload;
  const expiration = decoded.exp;

  if (expiration == null) {
    return true;
  }

  return isFuture(expiration * 1000);
}

const router = createRouter();

addGuard(router);

export default router;
