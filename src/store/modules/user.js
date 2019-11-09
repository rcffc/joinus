const state = {
	isLoggedIn: false,
	data: null
}

const getters = {
	user(state){
			return state
	}
}

const mutations = {
	SET_LOGGED_IN(state, value) {
			state.isLoggedIn = value;
	},
	SET_USER(state, data) {
			state.data = data;
	}
}

const actions = {
	fetchUser({ commit }, user) {
		commit("SET_LOGGED_IN", user !== null);
		if (user) {
			commit("SET_USER", {
					email: user.email
			});
		} 
		else {
			commit("SET_USER", null);
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