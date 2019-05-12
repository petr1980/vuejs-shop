import axios from "axios"


export default {
  state: {
    cart_list: []
  },

  getters: {
    cart_list(state) {
      return state.cart_list
    }
  },

  mutations: {
    getCartData(state, commit) {
      state.cart_list = commit;
    },
    addToCart(state, commit) {
      state.cart_list.unshift(commit)
    },
    updateCart(state, commit) {
      state.cart_list = commit;
    },
    deleteTovar(state, commit) {
      state.cart_list = commit
    },
    deleteAll(state) {
      state.cart_list = []
    }
  },

  actions: {
    getCartData({ commit }) {
      try {
        let data = JSON.parse(sessionStorage.getItem('cart')) || [];
        commit('getCartData', data)
      } catch (error) {
        console.log(error)
      }
    },
    addToCart({ state, commit }, payload) {
      commit('addToCart', payload)

      sessionStorage.setItem('cart', JSON.stringify([...state.cart_list]))
    },
    updateCart({ state, commit }, { id, num = 1 }) {
      let list = state['cart_list'].map(tovar => {
        if (tovar.id === id) tovar.quantity += num
        return tovar;
      });
      commit('updateCart', list)
      sessionStorage.setItem('cart', JSON.stringify(list))
    },
    deleteTovar({ state, commit }, id) {
      let new_list = state["cart_list"].filter(tovar => {
        return tovar.id !== id;
      });
      commit('deleteTovar', new_list);
      sessionStorage.setItem('cart', JSON.stringify(state['cart_list']))
    },
    deleteAll({ commit }) {
      commit('deleteAll');
      sessionStorage.removeItem('cart')
    }
  }
}