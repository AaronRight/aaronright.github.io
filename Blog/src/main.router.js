import VueRouter from 'vue-router';
import {Chapter, Topic} from './blog';

export function v_router(){
    return new VueRouter({
        routes : [
            { path: '/chapter/:id', component: Chapter },
            { path: '/topic/:id', component: Topic }
            ] 
    })   
}