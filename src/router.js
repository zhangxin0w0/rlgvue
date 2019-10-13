import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import ProductDetail from './views/ProductDetail.vue';
import Cart from './views/Cart.vue';
import MyCenter from './views/MyCenter.vue';


import ceshi from './views/ceshi.vue';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/productdetail',
      name: 'productdetail',
      component: ProductDetail,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    },
    {
      path: '/mycenter',
      name: 'mycenter',
      component: MyCenter,
    },
    {
      path: '/ceshi',
      name: 'ceshi',
      component: ceshi,
    }
  ],
});
