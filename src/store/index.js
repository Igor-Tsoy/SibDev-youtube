import Vue from 'vue';
import Vuex from 'vuex';
import users from './modules/users';
import youtube from './modules/youtube';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    users,
    youtube
  }
});
