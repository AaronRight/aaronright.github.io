import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';

Vue.use(Vuex);

import instruments from './resources/instruments.json';
import sounds from './resources/sounds.json';

export const store = new Vuex.Store({
  state: {
        melody: [],
        sounds : sounds,
        instruments: instruments
  },
  actions: {},
  mutations: {},
  getters: {
    sounds(state) {
        return state.sounds
    },
    instruments(state) {
        return state.instruments
    }
  },
  modules: {}
});

new Vue({
  el: '#app',
  store,
  render: h => h(App),
});