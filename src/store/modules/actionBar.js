const state = {
  name: ''
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  setName (state, name) {
    state.name = name || ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}