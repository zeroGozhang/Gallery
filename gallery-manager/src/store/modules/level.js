import * as types from '../types';

const test = {
  namespaced: true,
  state: {
    levelInfo: {
      name: '',
      end_time: null,
      status: 0,
      time_limit: 0,
    },
    step2List: [],
  },
  actions: {
    setSidebar({ commit }, type) {
      commit(types.SET_SIDEBAR_TYPE, type);
    },
  },
  mutations: {
    [types.SET_TEST_INFO](state, data) {
      state.levelInfo = data;
    },
    [types.INIT_LEVEL_DATA](state) {
      state.levelInfo = {
        name: '',
        status: 0,
        time_limit: 0,
      };
    },
  },
};

export default test;