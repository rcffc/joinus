import { events } from '../../api'
import _ from 'underscore'

const state = {
  all: []
}

// getters
const getters = {
  groupEvents: state => {
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
    events.sort((a,b) => a.date-b.date)
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