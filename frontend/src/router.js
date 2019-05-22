import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/home/home.vue';
import Admin from './components/admin/admin.vue';
import PostsListPage from './components/admin/posts-list-page/posts-list-page.vue';
import QuotesListPage from './components/admin/quotes-list-page/quotes-list-page.vue';
import ManageItemsPage from './components/admin/manage-items-page/manage-items-page.vue';
import CreateQuotePage from './components/admin/create-quote-page/create-quote-page.vue';
import EditQuotePage from './components/admin/edit-quote-page/edit-quote-page.vue';
import CreatePostPage from './components/admin/create-post-page/create-post-page.vue';
import EditPostPage from './components/admin/edit-post-page/edit-post-page.vue';
import FeedbackListPage from './components/admin/feedback-list-page/feedback-list-page.vue';

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
          name: 'manage',
          path: 'feed',
          component: ManageItemsPage
        },
        {
          name: 'reflectionsList',
          path: 'reflections',
          component: PostsListPage
        },
        {
          name: 'storiesList',
          path: 'stories',
          component: PostsListPage
        },
        {
          name: 'quotesList',
          path: 'quotes',
          component: QuotesListPage
        },
        {
          name: 'feedbackList',
          path: 'feedback',
          component: FeedbackListPage
        },
        {
          name: 'createQuote',
          path: 'add/quote',
          component: CreateQuotePage
        },
        {
          name: 'editQuote',
          path: 'edit/quote',
          component: EditQuotePage
        },
        {
          name: 'createReflection',
          path: 'add/reflection',
          component: CreatePostPage
        },
        {
          name: 'editReflection',
          path: 'edit/reflection/:title',
          component: EditPostPage
        },
        {
          name: 'createStory',
          path: 'add/story',
          component: CreatePostPage
        },
        {
          name: 'editStory',
          path: 'edit/story/:title',
          component: EditPostPage
        }
      ]
    }
  ]
});
