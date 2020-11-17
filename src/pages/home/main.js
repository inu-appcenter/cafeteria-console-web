import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.filter('str_limit', function (value, size) {
    if (!value) return '';
    value = value.toString();

    if (value.length <= size) {
        return value;
    }
    return value.substr(0, size) + '...';
});

new Vue({
    render: (h) => h(App),
    vuetify,
    router
}).$mount('#app')
