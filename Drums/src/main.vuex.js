import Vuex from 'vuex';

import instruments from './resources/instruments.json';
import sounds from './resources/sounds.json';
import notes from './resources/notes.json';
import template from './resources/template.json';

export function v_store(){
    return new Vuex.Store({
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
    }      