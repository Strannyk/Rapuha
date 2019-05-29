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
          component: PostsListPage,
          meta: {
            breadcrumb: [
              { name: 'Панель администратора', href: '/admin/feed' },
              { name: 'Размышления' }
            ]
          }
        },
        {
          name: 'storiesList',
          path: 'stories',
          component: PostsListPage,
          meta: {
            breadcrumb: [
              { name: 'Панель администратора', href: '/admin/feed' },
              { name: 'Рассказы' }
            ]
          }
        },
        {
          name: 'quotesList',
          path: 'quotes',
          component: QuotesListPage,
          meta: {
            breadcrumb: [
              { name: 'Панель администратора', href: '/admin/feed' },
              { name: 'Цитаты' }
            ]
          }
        },
        {
          name: 'feedbackList',
          path: 'feedback',
          component: FeedbackListPage,
          meta: {
            breadcrumb: [
              { name: 'Панель администратора', href: '/admin/feed' },
              { name: 'Отзывы' }
            ]
          }
        },
        {
          name: 'listOfUserFeedback',
          path: 'feedback/:user',
          component: FeedbackListPage,
          meta: {
            breadcrumb: [
              { name: 'Панель администратора', href: '/admin/feed' },
              { name: 'Отзывы', href: '/admin/feedback' }
            ]
          }
        },
        {
          name: 'createQuote',
          path: 'add/quote',
          component: CreateQuotePage,
          meta: {
            breadcrumb: [
              { name: 'Панель администратора', href: '/admin/feed' },
              { name: 'Цитаты', href: '/admin/quotes' },
              { name: 'Новая цитата' }
            ]
          }
        },
        {
          name: 'editQuote',
          path: 'edit/quote',
          component: EditQuotePage,
          meta: {
            breadcrumb: [
              { name: 'Панель администратора', href: '/admin/feed' },
              { name: 'Цитаты', href: '/admin/quotes' },
              { name: 'Редактирование цитаты' }
            ]
          }
        },
        {
          name: 'createReflection',
          path: 'add/reflection',
          component: CreatePostPage,
          meta: {
            breadcrumb: [
              { name: 'Панель администратора', href: '/admin/feed' },
              { name: 'Размышления', href: '/admin/reflections' },
              { name: 'Новое размышление' }
            ]
          }
        },
        {
          name: 'editReflection',
          path: 'edit/reflection/:title',
          component: EditPostPage,
          meta: {
            breadcrumb: [
              { name: 'Панель администратора', href: '/admin/feed' },
              { name: 'Размышления', href: '/admin/reflections' },
              { name: 'Редактирование размышления' }
            ]
          }
        },
        {
          name: 'createStory',
          path: 'add/story',
          component: CreatePostPage,
          meta: {
            breadcrumb: [
              { name: 'Панель администратора', href: '/admin/feed' },
              { name: 'Рассказы', href: '/admin/stories' },
              { name: 'Новый рассказ' }
            ]
          }
        },
        {
          name: 'editStory',
          path: 'edit/story/:title',
          component: EditPostPage,
          meta: {
            breadcrumb: [
              { name: 'Панель администратора', href: '/admin/feed' },
              { name: 'Рассказы', href: '/admin/stories' },
              { name: 'Редактирование рассказа' }
            ]
          }
        }
      ]
    }
  ]
});
