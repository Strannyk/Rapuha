import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueResource from 'vue-resource';

const eventHub = new Vue();
Vue.mixin({
  data() {
    return {
      eventHub: eventHub
    };
  }
});

Vue.use(VueResource);
Vue.config.productionTip = false;
Vue.config.silent = true;
Vue.config.devtools = false;
Vue.http.options.root = '/api/';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
