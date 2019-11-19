import Vue from 'vue'
import Vuex from 'vuex'

//Modules here
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules
})