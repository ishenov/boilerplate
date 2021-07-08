import Vue from 'vue'
import Router from 'vue-router'
import Currencies from "../views/Currencies";
import Login from "../views/Login";
import Register from "../views/Register";

Vue.use(Router)

const token = !!localStorage.getItem('token')

const ifAuthenticated = (to, from, next) => {
  if (token) {
    next();
    return;
  }
  next('/login');
};

const ifUnauthenticated = (to, from, next) => {
  if (!token) {
    next();
    return;
  }
  next('/');
};

const router = new Router({
  mode: 'history',
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/',
      name: 'Home',
      beforeEnter: ifAuthenticated,
      component: Currencies
    },
    {
      path: '/login',
      name: 'Login',
      beforeEnter: ifUnauthenticated,
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      beforeEnter: ifUnauthenticated,
      component: Register
    },
  ]
}

export default router

