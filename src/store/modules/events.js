import { events } from '../../api'
import _ from 'underscore'

const state = {
  allEvents: [],
  searchString: '',
  filteredEvents: []
}

// getters
const getters = {
  getGroupedEvents: state => {
    const grouped = _.groupBy(state.filteredEvents, 'month')
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
  },
  filterEvents ({commit}, word) {
    commit('filterEvents', word)
  }
}

const mutations = {
  setEvents (state, events) {
    events.sort((a,b) => a.date-b.date)
    state.allEvents = events
    state.filteredEvents = events
  },
  filterEvents (state, word) {
    if (!(word) || word === '') {
      state.searchString = ''
      state.filteredEvents = state.allEvents
    } else {
      state.searchString = word.toLowerCase()
      state.filteredEvents = state.allEvents.filter((event) => {
        if (event.name.toLowerCase().includes(word)) {
        }
        return event.name.toLowerCase().includes(word)
      })
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