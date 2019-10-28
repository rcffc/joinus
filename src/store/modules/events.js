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
  },
  getById: state => id => { //To pass arguments to a getter, it has to return a function. Here we want to pass 'id' our getter.
    return state.all.find(event => event.id === id)
  }
}

// actions : asynchronous methods for changing the stores state and fetching data. Can call mutations.
const actions = {
  async findAll ({ commit }) {
    try {
      const results = await events.getAll()
      commit('setEvents', results)
    }
    catch (err) {
      return Promise.reject(err)
    }
  },
  async find ({ commit, getters }, id) { //If the event is not in the store, try fetching it from firebase and update the store.
    try {
      let event = getters.getById(id)

      if (!event) {
        event = await events.getEvent(id)
        commit('addEvent', event)
      }

      return event
    }
    catch (err) {
      return Promise.reject(err)
    }
  }
}

// mutations : synchronous methods for changing the store's state.
const mutations = {
  setEvents (state, events) {
    events.sort((a,b) => a.date-b.date)
    state.all = events
  },
  addEvent (state, event) {
    state.all = state.all.concat(event)
    state.all.sort((a,b) => a.date-b.date)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}