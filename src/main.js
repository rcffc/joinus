import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import 'semantic-ui-css/semantic.min.css';

import routes from './routes'
Vue.use(VueRouter)

import SuiVue from 'semantic-ui-vue';
Vue.use(SuiVue);

import 'semantic-ui-css/semantic.min.css';


Vue.config.productionTip = false

const router = new VueRouter({routes});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')