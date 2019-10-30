const state = {
  all: [],
}

// getters
const getters = {
  count: (state) => {
    return state.all.length
  },
  getFirst: (state) => {
    return state.all[0]
  }
}

// actions : asynchronous methods for changing the stores state and fetching data. Can call mutations.
const actions = {
  next({ commit, getters }) {
    const target = getters.getFirst
    commit('shift')
    return target
  }
}

const mutations = {
  addNotification (state, data) {
    //expect data to have format { error, message, header }
    state.all = state.all.concat(data)
  },
  shift(state) {
    state.all.shift()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}