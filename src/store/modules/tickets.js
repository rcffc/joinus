import { tickets } from '../../api'

const state = {
  tickets: [],
  currentTicket: null
}

const getters = {
  tickets: state => {
    return state.tickets
  }
}

const actions = {
  async create ({ commit }, ticketData) {
    try {
      const newTicket = await tickets.createTicket(ticketData)
      commit('addTicket', newTicket)
    }
    catch (err) {
      return Promise.reject(err)
    }
  },
  async findByGroup ({ commit }, group) {
    try {
      const results = await tickets.findByGroup(group)
      commit('setTickets', results)
      return results
    }
    catch (err) {
      return Promise.reject(err)
    }
  },
  async delete ({ commit }, id) {
    try {
      await tickets.removeById(id)
      commit('removeTicket', id)
    }
    catch (err) {
      return Promise.reject(err)
    }
  },
  setCurrentTicket ({ commit }, id) {
    commit('setCurrentTicket', id)
  }
}

const mutations = {
  addTicket (state, ticket) {
    state.tickets = state.tickets.concat(ticket)
    state.currentTicket = ticket.id
  },
  setTickets (state, tickets) {
    state.tickets = tickets
  },
  removeTicket (state, id) {
    const index = state.tickets.findIndex((g) => g.id === id)
    state.tickets.splice(index, 1)
    state.currentTicket = null
  },
  setCurrentTicket (state, id) {
    state.currentTicket = id
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}