import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App.vue';

import instruments from './resources/instruments.json';
import sounds from './resources/sounds.json';
import note_sizes from './resources/notes.json';

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

Vue.prototype.rhythm_sample = new RhythmSample();

/*
    +--------------+------------+------------+- ... -+------------+
    |  common_info | bar_1_info | bar_2_info |       | bar_N_info |
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
    
    +-------------------------------------------------------------+
    | common_info                                                 |
    +-------------------------------------------------------------+
    | - melody_name                                               |
    | - bar_measure for default:  (4/4)                           |
    |   - numerator                                               |
    |   - denominator                                             |
    | - create new bar silent or with creation window             |
    +-------------------------------------------------------------+

    +-------------------------------------------------------------+
    | track_info                                                  |
    +-------------------------------------------------------------+
    | - instrument                                                |
    |   - notes                                                   |
    | - default note                                              |
    | - color                                                     |
    | - is muted?                                                 |
    | - hidden?                                                   |
    +-------------------------------------------------------------+
    
    +-------------------------------------------------------------+
    | bar_info                                                    |
    +-------------------------------------------------------------+
    | - bar_measure                                               |
    +-------------------------------------------------------------+
*/

export const store = new Vuex.Store({
  state: {
        melody: [[ { 
            'default_numerator' : 4, 
            'default_denominator': 4, 
            'create_bar_silently': false 
        } ]],
        sounds : sounds,
        instruments: instruments
  },
  actions: {
        addTrack({commit}, instrument) {
            commit('ADD_TRACK', instrument)
        },
        addTact({commit}, data_object) {
            commit('ADD_TACT', data_object)
        }
  },

  mutations: {
        ADD_TRACK(state, instrument) {
            state.melody.push([ instrument ]); // set instrument
            for( var i = 1; i < state.melody[0].length; i++ ){
                state.melody[ state.melody.length-1 ].push( [{ size: 1 , value: 0 }] );
            }
        },
        ADD_TACT(state, data_object) {
            state.melody[0].push( 
                {   
                    'numerator' : data_object.numerator, 
                    'denominator': data_object.denominator
                } );
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
    info(state) {
        return state.melody[0][0];
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
