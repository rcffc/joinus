import { users, auth } from '../../api'

const state = {
  isLoggedIn: false,
  data: {}
}

const getters = {
  user(state){
    return state
  }
}

const mutations = {
  SET_LOGGED_IN(state, value) {
    state.isLoggedIn = value
  },
  SET_USER(state, data) {
    state.data = data
  }
}

const actions = {
  fetchUser({ commit }, user) {
        
    commit('SET_LOGGED_IN', user !== null)
    if (user) {
      commit('SET_USER', {
        email: user.email
      })
    } 
    else {
      commit('SET_USER', null)
    }
  },
  async logOut({ commit }) {
    try {
      await auth.logOut()

      commit('SET_LOGGED_IN', false)
      commit('SET_USER', null)
    }
    catch (err) {
      return Promise.reject(err)
    }
  },
  async emailRegistration(params, info) {
    const { email, password } = info

    try {
      await auth.emailRegistration(email, password)
      await users.createUser(email)
    }
    catch (err) {
      return Promise.reject(err)
    }
  },
  async logIn(params, info) {
    const { email, password } = info

    try {
      await auth.emailLogin(email, password)
    }
    catch (err) {
      return Promise.reject(err)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}