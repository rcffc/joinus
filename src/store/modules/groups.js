import { groups } from '../../api'

const state = {
  allGroups: [],
  searchString: '',
  filteredGroups: []
}

// getters
const getters = {
  groups: state => {
    return state.filteredGroups
  }
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
  },
  filterGroups ({commit}, string) {
    commit('filterGroups', string)
  }
}

// mutations
const mutations = {
  setGroups (state, groups) {
    state.allGroups = groups
    state.filteredGroups = groups
  },
  filterGroups(state, searchString) {
    searchString = searchString.split(' ')
    console.log(searchString)
    console.log(state)
    // Filter by terms
    var searchTerms = searchString.filter(string => !string.includes('#'))
    searchTerms = searchTerms.join(' ')
    searchTerms = searchTerms.toLowerCase()
    state.filteredGroups = state.allGroups.filter((group) => {
      return group.name.toLowerCase().includes(searchTerms)
    })

    // Filter by tags
    var searchTags = searchString.filter(string => string.includes('#'))
    if (!(searchTags === undefined || searchTags.length == 0)) {
      var modifiedTags = []
      for (let tag of searchTags) {
        var modifiedTag = tag.substr(1, tag.length).toLowerCase()
        modifiedTags.push(modifiedTag)
      }

      function includesModifiedTags(groupTag) {
        for (let tag of modifiedTags) {
          if (groupTag.startsWith(tag)) {
            return true
          }
        }
      }

      state.filteredGroups = state.filteredGroups.filter((group) => {
        return group.tags.some(includesModifiedTags)
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