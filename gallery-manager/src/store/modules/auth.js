import * as types from '../types';
const authInfo = (() => {
  let au = {
    username: null,
    account: null,

    // authorities: null,
    // roles: null,

    token: {},
    err: null,
    avator: '',
    userInfo: {},
  };
  if (localStorage && localStorage.getItem('tokenInfo')) {
    let tokenInfo = {};
    try {
      tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'));
    } catch (e) {
      if (window) { window.console.log(e); }
    }
    au = { ...au, ...tokenInfo };
  }
  return au;
})();

const auth = {
  namespaced: true,
  state: {
    authInfo,
  },
  mutations: {
    [types.SAVE_TOKENINFO](state, data) {
      state.authInfo = data;
    },
  },
};

export default auth;
