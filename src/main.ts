import 'reflect-metadata';

import Vue from 'vue';
import App from './App.vue';
import router from './plugins/router';
import vuetify from './plugins/vuetify';
import Toasted from 'vue-toasted';
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
  return value.toLocaleString();
});

Vue.filter('format_time_diff', value => {
  if (!value) {
    return '';
  }

  const now = Date.now();
  const then = Number.parseInt(value);

  const diff = now - then;
  const calculatedHour = diff / 3600000;

  if (calculatedHour < 1) {
    return '1시간 미만';
  } else {
    return `${calculatedHour}시간`;
  }
});

Vue.use(Toasted, {
  position: 'bottom-right',
});

Vue.use(VueMasonryPlugin);

new Vue({
  render: h => h(App),
  vuetify,
  router,
}).$mount('#app');
