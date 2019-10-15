import { events } from '../../api'
import _ from 'underscore'

const state = {
  all: []
}

// getters
const getters = {
  groupEvents: state => {
    state.all.sort((a,b) => a.date-b.date)
    const grouped = _.groupBy(state.all, 'month')
    
    return grouped
  }
}

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