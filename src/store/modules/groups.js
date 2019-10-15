import { groups } from '../../api'

const state = {
  all: []
}

// getters
const getters = {
}

// actions
const actions = {
  async getAllGroups ({ commit }) {
    try {
      const results = await groups.getAll()
      commit('setGroups', results)
    }
    catch (err) {
      alert(err.message)
      //Do something here
    }
  }
}

// mutations
const mutations = {
  setGroups (state, groups) {
    state.all = groups
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}