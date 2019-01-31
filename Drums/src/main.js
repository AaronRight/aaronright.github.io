import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App.vue';

import instruments from './resources/instruments.json';
import sounds from './resources/sounds.json';

import Track from './components/templates/Track.vue'
import Bar from './components/templates/Bar.vue'
import Note from './components/templates/Note.vue'

Vue.use(Vuex);
Vue.use(VueRouter);

const router = new VueRouter({
    routes : [
        { path: '/track', component: Track },
        { path: '/bar', component: Bar },
        { path: '/note', component: Note }
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

            for( var i = 1; i < state.melody[0].length; i++ ){   // add tacts with notes
                state.melody[ state.melody.length-1 ].push( generate_notes( state.melody[0][i] ) );
            }
        },
        ADD_TACT(state, size) {
            state.melody[0].push( size ); // set size of tact

            for( var i = 1; i < state.melody.length; i++ ){ // for each instrument
                state.melody[i].push( generate_notes(size) );         // add notes
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
  router,
  render: h => h(App)
});
