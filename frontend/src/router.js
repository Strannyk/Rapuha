import Vue from 'vue';
import Router from 'vue-router';
import home from './components/home/home.vue';
import admin from './components/admin/admin.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    }
  ]
});
