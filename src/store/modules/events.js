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
  },
  getById: state => id => { //To pass arguments to a getter, it has to return a function. Here we want to pass 'id' our getter.
    return state.allEvents.find(event => event.id === id)
  },
  getTags: state => {
    return Array.from(new Set(state.allEvents.map(event => event.tags).flat()))
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
  },
  filterEvents ({commit}, string) {
    commit('filterEvents', string)
  }
}

const mutations = {
  setEvents (state, events) {
    events.sort((a,b) => a.date-b.date)
    state.allEvents = events
    state.filteredEvents = events
  },
  addEvent (state, event) {
    state.allEvents = state.allEvents.concat(event)
    state.allEvents.sort((a,b) => a.date-b.date)
  },
  filterEvents(state, searchString) {
    searchString = searchString.split(' ')

    // Filter by terms
    var searchTerms = searchString.filter(string => !string.includes('#'))
    searchTerms = searchTerms.join(' ')
    searchTerms = searchTerms.toLowerCase()
    state.filteredEvents = state.allEvents.filter((event) => {
      return event.name.toLowerCase().includes(searchTerms)
    })

    // Filter by tags
    var searchTags = searchString.filter(string => string.includes('#'))

    function includesModifiedTags(eventTag) {
      for (let tag of modifiedTags) {
        if (eventTag.startsWith(tag)) {
          return true
        }
      }
    }

    if (!(searchTags === undefined || searchTags.length == 0)) {
      var modifiedTags = []
      for (let tag of searchTags) {
        var modifiedTag = tag.substr(1, tag.length).toLowerCase()
        modifiedTags.push(modifiedTag)
      }

      state.filteredEvents = state.filteredEvents.filter((event) => {
        return event.tags.some(includesModifiedTags)
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