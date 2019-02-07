import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App.vue';

import instruments from './resources/instruments.json';
import sounds from './resources/sounds.json';
import notes from './resources/notes.json';
import template from './resources/template.json';

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

const PRESS_TIMEOUT = 1000
/* https://www.vuesnippets.com/posts/long-press/ */
Vue.directive('longpress', {
  bind: function (el, { value }, vNode) {
    if (typeof value !== 'function') {
      console.warn(`Expect a function, got ${value}`)
      return
    }

    let pressTimer = null

    const start = e => {
      if (e.type === 'click' && e.button !== 0) {
        return;
      }

      if (pressTimer === null) {
        pressTimer = setTimeout(() => value(e), PRESS_TIMEOUT)
      }
    }

    const cancel = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }

    ;['mousedown', 'touchstart'].forEach(e => el.addEventListener(e, start))
    ;['click', 'mouseout', 'touchend', 'touchcancel'].forEach(e => el.addEventListener(e, cancel))
  }
})

export const store = new Vuex.Store({
  state: {
        melody: template/*[[ { 
            'default_numerator' : 4, 
            'default_denominator': 4, 
            'create_bar_silently': false 
        } ]]*/,
        sounds : sounds,
        instruments: instruments,
        notes: notes
  },
  actions: {
        addTrack({commit}, instrument) {
            commit('ADD_TRACK', instrument)
        },
        addTact({commit}, params) {
            commit('ADD_TACT', params)
        },
        changeNote({commit}, params) {
            commit('CHANGE_NOTE', params)
        }
  },

  mutations: {
        ADD_TRACK(state, instrument) {
            state.melody.push([ instrument ]); // set instrument
            for( var i = 1; i < state.melody[0].length; i++ ){
                state.melody[ state.melody.length-1 ].push( [{ size: 1 , value: 0 }] );
            }
        },
        ADD_TACT(state, params) {
            state.melody[0].push( 
                {   
                    'numerator' : params.numerator, 
                    'denominator': params.denominator
                } );
            for( var i = 1; i < state.melody.length; i++ ){ // for each instrument
                state.melody[i].push( [{ size: 1 , value: 0 }] );         
            }
        },
        CHANGE_NOTE(state, params){
            state.melody[params.track][params.bar][params.index].size = state.melody[params.track][params.bar][params.index].size / 2; 
            state.melody[params.track][params.bar].splice(params.index, 0, { size: state.melody[params.track][params.bar][params.index].size , value: 0 } );
        }
  },
  getters: {
    sounds(state) {
        return state.sounds
    },
    notes(state) {
        return state.notes
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
