import VueRouter from 'vue-router';
import SignIn from '../features/signin/SignIn';
import SignUp from '../features/signup/SignUp';
import Vue from 'vue';

Vue.use(VueRouter);

function createRouter() {
    const routes = [
        {path: '/auth/sign-in', component: SignIn},
        {path: '/auth/sign-up', component: SignUp},
    ];
    const mode = 'history';

    return new VueRouter({routes, mode});
}

const router = createRouter();

export default router;
