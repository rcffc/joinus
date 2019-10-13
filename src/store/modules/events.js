import { events } from '../../api'

const state = {
  all: []
}

// getters
const getters = {}

// actions
const actions = {
  async getAllEvents ({ commit }) {
    try {
      const results = await events.getAll()
      commit('setEvents', results)
    }
    catch (err) {
      alert(err.message)
      //Do something here
    }
  }
}

// mutations
const mutations = {
  setEvents (state, events) {
    state.all = events
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}