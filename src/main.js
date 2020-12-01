import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router';
import vuetify from './plugins/vuetify';
import Toasted from 'vue-toasted';

Vue.filter('str_limit', function (value, size) {
    if (!value) return '';
    value = value.toString();

    if (value.length <= size) {
        return value;
    }
    return value.substr(0, size) + '...';
});

Vue.filter('format_date', function (value) {
    if (!value) {
        return ''
    }
    return new Date(Number.parseInt(value)).toLocaleString();
});

Vue.use(Toasted, {
    position: 'bottom-right',
});

new Vue({
    render: (h) => h(App),
    vuetify,
    router,
}).$mount('#app')

