import Vue from 'vue';
import Router from 'vue-router';
import home from './components/home/home.vue';
import admin from './components/admin/admin.vue';
import createItemChoice from './components/admin/create-item-choice/create-item-choice.vue';
import createItemForm from './components/admin/create-item-form/create-item-form.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: home
    },
    {
      name: 'admin',
      path: '/admin',
      component: admin,
      children: [
        {
          name: 'creation',
          path: 'add',
          component: createItemChoice
        },
        {
          name: 'quote',
          path: 'add/quote',
          component: createItemForm
        }
      ]
    }
  ]
});
