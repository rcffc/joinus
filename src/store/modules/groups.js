import { groups } from '../../api'

const state = {
  all: []
}

// getters
const getters = {
  getById: state => id => { //To pass arguments to a getter, it has to return a function. Here we want to pass 'id' our getter.
    return state.all.find(group => group.id === id)
  }
}

// actions : asynchronous methods for changing the stores state and fetching data. Can call mutations.
const actions = {
  async findAll ({ commit }) {
    try {
      const results = await groups.getAll()
      commit('setGroups', results)
    }
    catch (err) {
      alert(err.message)
      //Do something here
    }
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
  }
}

// mutations : synchronous methods for changing the store's state.
const mutations = {
  setGroups (state, groups) {
    state.all = groups
  },
  addGroup (state, group) {
    state.all = state.all.concat(group)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}