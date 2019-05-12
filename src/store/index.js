import Vue from 'vue'
import Vuex from 'vuex'

import helper from './helper'
import tovar from './tovar'
import cart from './cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    helper,
    tovar,
    cart
  }
})
