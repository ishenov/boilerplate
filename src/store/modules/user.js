import Vue from 'vue'
import {AUTH_LOGIN, AUTH_LOGOUT, REGISTER_USER} from "../actions/user";
import {HTTP_POST} from "../actions/events";

const state = {
  token: localStorage.getItem('token') || '',
  role: null,
}
const getters = {
  isAuthenticated: state => !!state.token,
  getUserRole: state => state.role,
}
const actions = {
  [AUTH_LOGIN]: async ({dispatch, commit}, {data}) => {
    const request = await dispatch(HTTP_POST, {
      method: AUTH_LOGIN,
      data,
      namespace: 'user',
    }, {root: true});

    if (request.token) {
      const token = request.token;
      const role = request.role || 'user';

      localStorage.setItem('token', token);

      commit(AUTH_LOGIN, {
        token,
        role,
      });
      window.location.href = window.location.origin
    }
  },
  [AUTH_LOGOUT]: async ({commit}) => {
    window.location.href = window.location.origin
    commit(AUTH_LOGOUT);
  },
  [REGISTER_USER]: async ({dispatch, commit}, {data}) => {
    const request = await dispatch(HTTP_POST, {
      method: REGISTER_USER,
      data,
      namespace: 'user',
    }, {root: true});

    if (request.token) {
      const token = request.token;
      const role = request.role || 'user';

      localStorage.setItem('token', token);

      commit(AUTH_LOGIN, {
        token,
        role
      });
      window.location.href = window.location.origin
    }
  },
}
const mutations = {
  [AUTH_LOGIN]: (state, {token, role}) => {
    Vue.set(state, 'token', token);
    Vue.set(state, 'role', role);
  },
  [AUTH_LOGOUT]: (state) => {
    localStorage.removeItem('token');
    Vue.set(state, 'token', '');
  },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
