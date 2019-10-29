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
    if (!(searchTags === undefined || searchTags.length == 0)) {
      var modifiedTags = []
      for (let tag of searchTags) {
        var modifiedTag = tag.substr(1, tag.length).toLowerCase()
        modifiedTags.push(modifiedTag)
      }

      function includesModifiedTags(eventTag) {
        for (let tag of modifiedTags) {
          if (eventTag.startsWith(tag)) {
            return true
          }
        }
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