import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import VuetifyConfirm from 'vuetify-confirm';
import VuetifyDialog from 'vuetify-dialog';
import 'vuetify-dialog/dist/vuetify-dialog.css';

const vuetify = new Vuetify({});

Vue.use(Vuetify); // This line necessary
Vue.use(VuetifyConfirm, {vuetify});
Vue.use(VuetifyDialog, {context: {vuetify}});

export default vuetify;
