import Vue from 'vue'
import App from './App.vue'
import PortalVue from 'portal-vue'

import jQuery from 'jquery'

import 'semantic-ui-css/semantic.min.css'
import 'semantic-ui-css/semantic.js'

import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(PortalVue)

Vue.use({
  install: function(Vue){
    Vue.prototype.$jQuery = jQuery // you'll have this.$jQuery anywhere in your vue project
  }
})
new Vue({ 
  router, //Inject router to all child components.
  store,  // Inject store to all child components.
  render: h => h(App),
}).$mount('#app')
