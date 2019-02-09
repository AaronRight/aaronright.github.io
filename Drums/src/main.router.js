import VueRouter from 'vue-router';
import {Track, Bar, Note} from './components';

export function v_router(){
    return new VueRouter({
        routes : [
            { path: '/track/:index', component: Track },
            { path: '/bar/:index', component: Bar },
            { path: '/note/:track/:bar/:index', component: Note }
            ] 
    })   
}