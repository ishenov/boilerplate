import Vue from 'vue';
import Vuex from 'vuex';

import events from './modules/events';
import user from './modules/user';
import currencies from './modules/currencies';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    events,
    user,
    currencies
  },
  state: {

  },
  mutations: {},
  actions: {},
  getters: {},
});
