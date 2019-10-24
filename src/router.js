import Vue from 'vue';
import VueRouter from 'vue-router';
import Tests from './components/Tests';
import Questions from './components/Questions';
import SignIn from './components/SignIn';
import About from './components/About';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import firebase from 'firebase';
import Home from './components/Home';

Vue.use(VueRouter);

const routes = [
  {path: '/', component: Tests},
  {path: '/questions', component: Questions},
  {path: '/signin', component: SignIn, meta: {isPublic: true}},
  {path: '/about', component: About, meta: {isPublic: true}},
  {path: '/terms', component: Terms, meta: {isPublic: true}},
  {path: '/privacy', component: Privacy, meta: {isPublic: true}},
  {path: '/index', component: Home, meta: {isPublic: true}},
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
