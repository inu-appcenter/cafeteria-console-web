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

import 'reflect-metadata';

import Vue from 'vue';
import App from './App.vue';
import router from './plugins/router';
import vuetify from './plugins/vuetify';
import Toasted from 'vue-toasted';
import VTooltip from 'v-tooltip';
import DatetimePicker from 'vuetify-datetime-picker';
import {VueMasonryPlugin} from 'vue-masonry';

Vue.filter('str_limit', (value, size) => {
  if (!value) return '';
  value = value.toString();

  if (value.length <= size) {
    return value;
  }
  return value.substr(0, size) + '...';
});

Vue.filter('format_date', value => {
  if (!value) {
    return '';
  }

  if (!(value instanceof Date)) {
    return 'NON-DATE';
  }

  return value.toLocaleString();
});

Vue.filter('format_time_diff', value => {
  if (!value) {
    return '';
  }

  if (!(value instanceof Date)) {
    return 'NON-DATE';
  }

  const now = Date.now();
  const then = value.getTime();

  const diff = now - then;
  const calculatedHour = diff / 3600000;

  if (calculatedHour < 1) {
    return '1시간 미만';
  } else {
    return `${Math.floor(calculatedHour)}시간`;
  }
});

Vue.use(Toasted, {
  position: 'bottom-right',
});

Vue.use(VueMasonryPlugin);

Vue.use(DatetimePicker);

Vue.use(VTooltip);

new Vue({
  render: h => h(App),
  vuetify,
  router,
}).$mount('#app');
