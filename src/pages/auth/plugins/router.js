import VueRouter from 'vue-router';
import SignIn from '../features/signin/SignIn';
import Vue from 'vue';

Vue.use(VueRouter);

function createRouter() {
    const routes = [
        {path: '/auth/sign-in', component: SignIn},
    ];

    return new VueRouter({routes});
}

const router = createRouter();

export default router;
