import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    genres: []
  },
  mutations: {
    setGenres(state, payload) {
      state.genres = payload
    }
  }
})

export default store
