import {GET_CURRENCIES} from "../actions/currencies";
import {HTTP_GET} from "../actions/events";

const state = {
  currencies: []
}
const getters = {
  getCurrencies: () => state.currencies
}
const actions = {
  [GET_CURRENCIES]: async ({dispatch, commit}, {params}) => {
    const res = await dispatch(HTTP_GET, {
      method: GET_CURRENCIES,
      params,
      response: false
    }, {root: true});
    commit(GET_CURRENCIES, res[0])
  }
}
const mutations = {
  [GET_CURRENCIES]: (state, data) => {
    state.currencies = data
  },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
