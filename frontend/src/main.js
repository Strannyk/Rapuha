import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.config.productionTip = false;
Vue.prototype.baseUrl = 'http://127.0.0.1:3000/';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
