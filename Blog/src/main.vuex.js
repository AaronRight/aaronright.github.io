import Vuex from 'vuex';
import data_store from './store.json';

export function v_store(){
    return new Vuex.Store({
            state: {
                data: data_store
            },
            getters: {
                chapters: (state) => (parent_id = null) => {
                    let chapters = state.data['chapters']; 
                    let result = [];
                    for ( let current of chapters ){
                        if ( current['parent'] == parent_id )
                            result.push(current);
                    }
                    return result;
                },
                chapter: (state) => (id) => {
                    let chapters = state.data['chapters']; 
                    for ( let current of chapters ){
                        if ( current['id'] == id )
                            return current;
                    }
                },
                topics: (state) => (parent_id = null) => {
                    let topics = state.data['topics']; 
                    let result = [];
                    for ( let current of topics ){
                        if ( current['parent'] == parent_id )
                            result.push(current);
                    }
                    return result;
                },
                topic: (state) => (id) => {
                    let topics = state.data['topics']; 
                    for ( let current of topics ){
                        if ( current['id'] == id )
                            return current;
                    }
                },
                reference: (state) => (id) => {
                    let references = state.data['references']; 
                    for ( let current of references ){
                        if ( current['id'] == id )
                            return current;
                    }
                },
                flowchartElement: (state, getters) => (reference_id, element_id) => {
                    let ref = getters.reference(reference_id); 
                    for ( let current of ref['elements'] ){
                        if ( current['id'] == element_id )
                            return current;
                    }
                }
            }
        });
    }      