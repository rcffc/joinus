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
  },
  getById: state => id => { //To pass arguments to a getter, it has to return a function. Here we want to pass 'id' our getter.
    return state.allGroups.find(group => group.id === id)
  },
  getTags: state => {
    return Array.from(new Set(state.allGroups.map(group => group.tags).flat()))
  }
}


// actions : asynchronous methods for changing the stores state and fetching data. Can call mutations.
const actions = {
  async findAll ({ commit }, userId) {
    try {
      const results = await groups.getAll()
      if (userId) {
        return results.filter(group => group.members.some(user => user.id === userId))
      }
      commit('setGroups', results)
    }
    catch (err) {
      return Promise.reject(err)
      //Do something here
    }
  },
  filterGroups ({ commit }, string) {
    commit('filterGroups', string)
  },
  async find ({ commit, getters }, id) { //If the group is not in the store, try fetching it from firebase and update the store.
    try {
      let group = getters.getById(id)

      if (!group) {
        group = await groups.getGroup(id)
        commit('addGroup', group)
      }

      return group
    }
    catch (err) {
      return Promise.reject(err)
    }
  },
  async create ({ commit }, groupData) {
    try {
      const newGroup = await groups.createGroup(groupData)

      commit('addGroup', newGroup)
    }
    catch (err) {
      return Promise.reject(err)
    }
  },
  async edit ({ commit }, groupData) {
    try {      
      const { id, ...data } = groupData

      const editedGroup = await groups.editGroup(id, data)

      commit('replaceGroup', editedGroup)
    }
    catch (err) {
      err.name = 'CustomError'

      return Promise.reject(err)
    }
  },
  async delete ({ commit }, id) {
    try {
      await groups.removeById(id)
      commit('removeGroup', id)
    }
    catch (err) {
      return Promise.reject(err)
    }
  },
  async addMember ( {commit}, data) {
    try {
      const editedGroup = await groups.addMember(data)
      commit('editGroup', editedGroup) 
    } catch (err) {
      return Promise.reject(err)
    }
  },
  async removeMember ( {commit}, data) {
    try {
      const editedGroup = await groups.removeMember(data)
      commit('editGroup', editedGroup) 
    } catch (err) {
      return Promise.reject(err)
    }
  }
}

// mutations : synchronous methods for changing the store's state.
const mutations = {
  setGroups (state, groups) {
    state.allGroups = groups
    state.filteredGroups = groups
  },
  replaceGroup (state, group) {
    const index = state.allGroups.findIndex((g) => g.id === group.id)

    state.allGroups.splice(index, 1, group)
  },
  removeGroup (state, id) {
    const index = state.allGroups.findIndex((g) => g.id === id)

    state.allGroups.splice(index, 1)
  },
  filterGroups(state, searchString) {
    searchString = searchString.split(' ')
    

    // Filter by terms
    var searchTerms = searchString.filter(string => !string.includes('#'))
    searchTerms = searchTerms.join(' ')
    searchTerms = searchTerms.toLowerCase()
    state.filteredGroups = state.allGroups.filter((group) => {
      return group.name.toLowerCase().includes(searchTerms)
    })

    // Filter by tags
    function includesModifiedTags(groupTag) {
      for (let tag of modifiedTags) {
        if (groupTag.startsWith(tag)) {
          return true
        }
      }
    }

    var searchTags = searchString.filter(string => string.includes('#'))
    if (!(searchTags === undefined || searchTags.length == 0)) {
      var modifiedTags = []
      for (let tag of searchTags) {
        var modifiedTag = tag.substr(1, tag.length).toLowerCase()
        modifiedTags.push(modifiedTag)
      }

      state.filteredGroups = state.filteredGroups.filter((group) => {
        return group.tags.some(includesModifiedTags)
      })
    }
  },
  addGroup (state, group) {
    state.allGroups = state.allGroups.concat(group)
  },
  editGroup (state, editedGroup) {
    const index = state.allGroups.findIndex((g) => g.id === editedGroup)
    state.allGroups.splice(index, 1, editedGroup)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}