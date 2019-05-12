import axios from "axios"

export default {
  state: {
    tovar_list: [],
    images: 'https://jsonplaceholder.typicode.com/photos?albumId=1',
  },

  getters: {
    tovar_list(state) {
      return state.tovar_list
    }
  },

  mutations: {
    getData(state, commit) {
      state.tovar_list = commit
    },
  },

  actions: {
    fetchData({ state, commit }) {
      let res_cost = [];
      commit('setLoading', true);
      axios.get(state.images)
        .then(res => {
          res_cost = res.data.map(item => { // костыль для фейковых данных
            item.cost = (Math.random() * 100).toFixed(2)
            return item
          })
          commit('getData', res_cost);
          commit('setLoading', true);
        })
        .catch(error => {
          console.log(error);
        })
        .then(res => {
          commit('setLoading', false);
        })
    }
  }
}