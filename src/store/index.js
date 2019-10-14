import Vue from 'vue'
import Vuex from 'vuex'

//Modules here
import modules from './modules'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules,
  strict: debug
})