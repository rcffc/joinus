import { users, auth } from '../../api'

const state = {
  isLoggedIn: 'inProgress',
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
  async fetchUser({ commit }, user) {
    if (user) {
      const userData = await users.getUser(user.uid)

      commit('SET_USER', {
        id: user.uid,
        email: user.email,
        following: userData.following
      })
    } 
    else {
      commit('SET_USER', null)
    }

    commit('SET_LOGGED_IN', user != null)
  },
  async logOut({ commit }) {
    try {
      await auth.logOut()

      commit('SET_LOGGED_IN', 'inProgress')
    }
    catch (err) {
      return Promise.reject(err)
    }
  },
  async emailRegistration(params, info) {
    const { email, password } = info

    try {
      const { user } = await auth.emailRegistration(email, password)

      await users.createUser(email, user.uid)
    }
    catch (err) {
      return Promise.reject(err)
    }
  },
  async logIn({ commit }, info) {
    const { email, password } = info

    try {
      await auth.emailLogin(email, password)
      commit('SET_LOGGED_IN', 'inProgress')
    }
    catch (err) {
      return Promise.reject(err)
    }
  },
  async edit ({commit} , ids) {
    try {
      const newUser = await users.editUser(ids[0], ids[1])
      commit('SET_USER', newUser)   
    }
    catch (err) {
      err.name = 'CustomError'
      return Promise.reject(err)
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}