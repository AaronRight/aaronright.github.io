import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';

Vue.use(Vuex);

import instruments from './resources/instruments.json';
import sounds from './resources/sounds.json';

export const store = new Vuex.Store({
  state: {
        melody: [[ false ]],
        sounds : sounds,
        instruments: instruments
  },
  actions: {
        addTrack({commit}, instrument) {
            commit('ADD_TRACK', instrument)
        },
        addTact({commit}, size) {
            commit('ADD_TACT', size)
        }
  },
  mutations: {
        ADD_TRACK(state, instrument) {
            state.melody.push([ instrument ]);
            /* todo fill track if its empty and others not */
        },
        ADD_TACT(state, size) {
            state.melody[0].push( size );

            for( var i = 1; i < state.melody.length; i++ ){
                state.melody[i].push( eval(size) );
            }
        }
  },
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