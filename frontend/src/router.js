import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/home/home.vue';
import Admin from './components/admin/admin.vue';
import CreateItemChoice from './components/admin/create-item-choice/create-item-choice.vue';
import CreateQuotePage from './components/admin/create-quote-page/create-quote-page.vue';
import CreatePostPage from './components/admin/create-post-page/create-post-page.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'admin',
      path: '/admin',
      component: Admin,
      children: [
        {
          name: 'creation',
          path: 'add',
          component: CreateItemChoice
        },
        {
          name: 'createQuote',
          path: 'add/quote',
          component: CreateQuotePage
        },
        {
          name: 'createReflection',
          path: 'add/reflection',
          component: CreatePostPage
        },
        {
          name: 'createStory',
          path: 'add/story',
          component: CreatePostPage
        }
      ]
    }
  ]
});
