import {
  HTTP_DELETE,
  HTTP_ERROR,
  HTTP_ERROR_CLEAR,
  HTTP_GET,
  HTTP_POST,
  HTTP_PUT,
  LOADING,
  PAGINATION,
  RESET_ERRORS,
} from '../actions/events';
import cfg from '../../../config';
import axios from 'axios';
import * as _ from 'lodash';
import Vue from 'vue';
import {GET_CURRENCIES} from "../actions/currencies";
import {AUTH_LOGIN, REGISTER_USER} from "../actions/user";

const getUrl = (url, params) => {
  if (!url) {
    console.log('ERROR URL', url, params);
    return cfg.api
  }
  let path = url;
  _.each(params, (value, key) => {
    path = path.replace(`:${key}:`, value);
  });
  return cfg.api + path
};

const state = {
  path: {
    [GET_CURRENCIES]: '/currencies',
    [AUTH_LOGIN]: '/login',
    [REGISTER_USER]: '/users',
  },
  loading: {},
  loadingRequest: {},
  error: {},
  pagination: {},
  failedHttpRequests: 0,
  connectRequestsTimeout: 3000,
};

const getters = {
  loading: (state) => name => name ? state.loading[name] : state.loading,
  loadingRequest: (state) => name => name ? state.loadingRequest[name] : state.loadingRequest,
  errorRequest: (state) => state.error,
};

const actions = {
  [HTTP_GET]: async ({state, commit}, {method, response, params, data, auto, timeoutOff=false}) => {
    console.log({log: 'HTTP_GET'}, method, 'params', params, data);
    response = response || response === false ? response : method;
    commit(LOADING, {name: method, value: 'loading'});
    const source = axios.CancelToken.source();
    let cancel = false;
    let timeout = setTimeout(() => {
      if (cancel === false && timeoutOff === false) {
        cancel = true;
        source.cancel();
      }
    }, state.connectRequestsTimeout);

    try {
      const resp = await axios.get(getUrl(state.path[method], params), {data: {...data, cancelToken: source.token}, params})
      if (timeout) {
        clearTimeout(timeout);
      }
      if (resp.data && !resp.data.error) {
        if (auto !== false && response !== false) {
          commit(response, resp.data)
        }
        commit(LOADING, {name: method, value: 'loaded', data: resp.data});
        if (resp.pagination) {
          commit(PAGINATION, {name: method, data: resp.pagination});
        }
      } else {
        commit(LOADING, {name: method, value: 'error', data: resp.data.error || resp});
      }
      return resp.data;
    } catch (e) {
      commit(LOADING, {name: method, value: 'error', data: e});
    }
  },
  [HTTP_POST]: async ({state, commit}, {method, response, params, data, auto, headers}) => {
    response = response || response === false ? response : method;
    headers = headers || {};
    commit(LOADING, {name: method, value: 'loading'});
    try {
      const resp = await axios.post(getUrl(state.path[method], params), data, {headers})
      if (resp.data && !resp.data.error) {
        if (auto !== false && response !== false) {
          commit(response, resp.data);
        }
        commit(LOADING, {name: method, value: 'loaded', data: resp.data});
      } else {
        commit(LOADING, {name: method, value: 'error', data: resp.data.error || resp});
      }
      return resp.data;
    } catch (e) {
      commit(LOADING, {name: method, value: 'error', data: e});
    }
  },
  [HTTP_PUT]: ({state, commit}, {method, response, params, data, auto}) => {
    console.log({log: 'HTTP_PUT'}, method, params, data);
    response = response || response === false ? response : method;
    commit(LOADING, {name: method, value: 'loading'});
    return axios.put(getUrl(state.path[method], params), data).then(resp => {
      if (resp.data && !resp.data.error) {
        if (auto !== false && response !== false) {
          commit(response, resp.data);
        }
        commit(LOADING, {name: method, value: 'loaded', data: resp.data});
      } else {
        commit(LOADING, {name: method, value: 'error', data: resp.data.error || resp});
      }
      return resp.data;
    }).catch(req => {
      commit(LOADING, {name: method, value: 'error', data: req});
    })
  },
  [HTTP_DELETE]: ({state, commit}, {method, response, params, data, auto}) => {
    console.log({log: 'HTTP_DELETE'}, method, params, data);
    response = response || response === false ? response : method;
    commit(LOADING, {name: method, value: 'loading'});
    return axios.delete(getUrl(state.path[method], params), data).then(resp => {
      if (resp.data && !resp.data.error) {
        if (auto !== false && response !== false) {
          commit(response, resp.data);
        }
        commit(LOADING, {name: method, value: 'loaded', data: resp.data});
      } else {
        commit(LOADING, {name: method, value: 'error', data: resp.data.error || resp});
      }
      return resp.data;
    }).catch(req => {
      commit(LOADING, {name: method, value: 'error', data: req});
    })
  },
};

const mutations = {
  [LOADING]: (state, {name, value, data}) => {
    console.log({log: 'LOADING'}, name, value, data);
    Vue.set(state.loading, name, value);
    Vue.set(state.loadingRequest, name, data);
  },
  [HTTP_ERROR]: (state, {name, data, status}) => {
    if (!state.error[name]) {
      data.status = status;
      console.log({log: 'ERROR'}, name, data);
      Vue.set(state.error, name, data);
    }
  },
  [HTTP_ERROR_CLEAR]: (state) => {
    Vue.set(state, 'error', {});
  },
  [PAGINATION]: (state, {name, data}) => {
    Vue.set(state.pagination, name, data);
  },
  [RESET_ERRORS]: (state, {name, data}) => {
    if (state.loadingRequest[name]) {
      Vue.set(state.loadingRequest, name, data);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations
}
