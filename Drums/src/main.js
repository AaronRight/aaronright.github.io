import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App.vue';

import instruments from './resources/instruments.json';
import sounds from './resources/sounds.json';

import {Track, Bar, Note} from './components';

Vue.use(Vuex);
Vue.use(VueRouter);

const router = new VueRouter({
    routes : [
        { path: '/track/:index', component: Track },
        { path: '/bar/:index', component: Bar },
        { path: '/note/:track/:bar/:index', component: Note }
        ] 
})

function generate_notes( size ){
    var note_size = size.split('/')[1];
    var counter = eval(size) / ( 1 / note_size );

    var notes = [];
    for( var i = 0; i < counter; i++ ){
        notes.push( { value : 0, size : 1 / note_size } );
    }
    return notes;
}

Vue.prototype.rhythm_sample = new RhythmSample();

/*
    +--------------+------------+------------+- ... -+------------+
    |     name     | bar_1_info | bar_2_info |       | bar_N_info |
    +--------------+------------+------------+- ... -+------------+
    | track_1_info |  notes[ ]  |            |       |            |
    +--------------+------------+------------+- ... -+------------+
    | track_2_info |            |            |       |            |
    +--------------+------------+------------+- ... -+------------+   
    |              |            |            |       |            |
          ...           ...          ...                  ...
    |              |            |            |       |            |
    +--------------+------------+------------+- ... -+------------+   
    | track_M_info |            |            |       |            |
    +--------------+------------+------------+- ... -+------------+     
*/

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
            state.melody.push([ instrument ]); // set instrument
            for( var i = 1; i < state.melody[0].length; i++ ){
                state.melody[ state.melody.length-1 ].push( [{ size: 1 , value: 0 }] );
            }
        },
        ADD_TACT(state, size) {
            state.melody[0].push( { 'size' : size } ); // set size of tact
            for( var i = 1; i < state.melody.length; i++ ){ // for each instrument
                state.melody[i].push( [{ size: 1 , value: 0 }] );         
            }
        }
  },
  getters: {
    sounds(state) {
        return state.sounds
    },
    instruments(state) {
        return state.instruments
    },
    track: (state) => (index) => {
        return state.melody[index][0];
    },
    bar: (state) => (index) => {
        return state.melody[0][index];
    },
    note: (state) => (track, bar, index) => {
        return state.melody[track][bar][index];
    }
  },
  modules: {}
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
