import Vue from 'vue'
import App from './App.vue'
import PortalVue from 'portal-vue'

import 'semantic-ui-css/semantic.min.css'

import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(PortalVue)

import * as firebaseui from 'firebaseui'

new Vue({ 
  router, //Inject router to all child components.
  store,  // Inject store to all child components.
  render: h => h(App),
}).$mount('#app')
