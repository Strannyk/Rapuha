import Vue from 'vue';
import Router from 'vue-router';
import home from './components/home/home.vue';

const admin = () => import(/* webpackChunkName: "admin" */ './components/admin/admin.vue');

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: home
    },
    {
      path: '/admin',
      component: admin
    }
  ]
});
