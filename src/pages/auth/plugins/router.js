import VueRouter from 'vue-router';
import SignIn from '../features/signin/SignIn';
import Vue from 'vue';

Vue.use(VueRouter);

function createRouter() {
    const routes = [
        {path: '/sign-in', component: SignIn},
    ];
    const mode = 'history';

    return new VueRouter({routes, mode});
}

const router = createRouter();

export default router;
