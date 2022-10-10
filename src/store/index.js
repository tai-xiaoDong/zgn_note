import notebooks from '@/apis/notebooks'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notebooks: [],
  },
  getters: {
    notebooks: state => state.notebooks
  },
  mutations: {
    setNotebooks(state, payload) {
      state.notebooks = payload.notebooks
    },
    addNotebook(state, payload) {
      state.notebooks.push(payload.notebooks)
    },
    updateNotebook(state, payload) {
      let notebooks = state.notebooks.find(notebooks => notebooks.notebooks === payload.notebooks)
      notebooks.notebooks = payload.notebooks;
    },
    deleteNotebooks(state, payload) {
      state.notebooks = state.notebooks.filter(notebooks => notebooks.notebooks != payload.notebooks)
    },
  },
  actions: {
    getNotebooks({ commit }) {
      notebooks
        .getAll()
        .then((data) => {
          let array = [];
          for (let i = 0; i < data.length; i++) {
            if (array.indexOf(data[i].notebooks) === -1) {
              array.push(data[i].notebooks);
            } else {
              continue;
            }
          }
          commit('setNotebooks', { notebooks: data })
        })
        .catch((data) => {
          console.log(data);
        });
    },
    addNotebook({ commit }, payload) {
      notebooks
        .addNotebook({ notebooks: payload.notebooks })
        .then((data) => {
          commit('addNotebook', { notebooks: data.notebooks })
        })
        .catch((data) => {
          this.onAlert(data.msg);
        });
    }
  },
  modules: {
  }
})
