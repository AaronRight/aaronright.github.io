import VueRouter from 'vue-router';
import {Chapter, Topic} from './blog';
import {NodeProperties, EdgeProperties} from './flowchart'

export function v_router(){
    return new VueRouter({
        routes : [
            { path: '/chapter/:id', component: Chapter },
            { path: '/topic/:id', component: Topic },

            { path: '/node/:id', component: NodeProperties },
            { path: '/edge/:id', component: EdgeProperties },
            ] 
    })   
}