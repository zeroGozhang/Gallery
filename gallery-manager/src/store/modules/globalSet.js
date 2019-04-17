import Vue from 'vue';
import * as types from '../types';

const globalSet = {
  namespaced: true,
  state: {
    sidebar: true,
    device: 'desktop',
  },
  actions: {
    setSidebar({ commit }, type) {
      commit(types.SET_SIDEBAR_TYPE, type);
    },
  },
  mutations: {
    [types.SET_SIDEBAR_TYPE](state, type) {
      state.sidebar = type;
      Vue.ls.set(types.SIDEBAR_TYPE, type);
    },

    [types.TOGGLE_DEVICE](state, device) {
      state.device = device;
    },
  },
};

export default globalSet;