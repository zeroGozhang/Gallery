import vue from 'vue';
import vuex from 'vuex';
import uuid from 'uuid';
import auth from './modules/auth';
import globalSet from './modules/globalSet';
import level from './modules/level';

import * as types from './types';

vue.use(vuex);

const store = new vuex.Store({
  state: {
    loading: 0,
    errorMessages: {},
  },
  mutations: {
    [types.ADD_ERROE_MESSAGE](state, errorMessage) {
      vue.set(state.errorMessages, uuid.v4(), errorMessage);
    },
    [types.REMOVE_ERROE_MESSAGE](state, key) {
      delete state.errorMessages[key]; // eslint-disable-line no-param-reassign
    },
  },
  actions: {},
  modules: {
    auth,
    globalSet,
    level,
  },
  // eslint-disable-next-line
  strict: process.env.NODE_ENV !== 'production',
});

export default store;
