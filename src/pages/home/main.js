import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
    render: (h) => h(App),
    vuetify,
    router
}).$mount('#app')
