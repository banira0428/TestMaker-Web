import Vue from 'vue';
import VueRouter from 'vue-router';
import Tests from './components/Tests';
import Questions from './components/Questions';
import SignIn from './components/SignIn';
import About from './components/About';
import firebase from 'firebase';

Vue.use(VueRouter);

const routes = [
    {path: '/', component: Tests},
    {path: '/questions/:id', component: Questions},
    {path: '/signin', component: SignIn, meta: {isPublic: true}},
    {path: '/about', component: About, meta: {isPublic: true}}
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => !record.meta.isPublic);
    if (requiresAuth) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                next()
            } else {
                next({
                    path: '/signin',
                    query: {redirect: to.fullPath}
                })
            }
        })
    } else {
        next()
    }
});

export default router;