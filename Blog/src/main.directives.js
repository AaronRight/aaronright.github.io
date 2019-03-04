import Vue from 'vue';
import Vuex from 'vuex';

var grab = { 
    chosen : false
}

function mousedown (e, el) {  
    grab.chosen = true;
}

function mouseup (e, el) { 
    grab.chosen = false; 
}

function mousemove (e, el) {
    if(grab.chosen){
        let figure = el.children[0]; let text = el.children[1]; 

        let pt = el.parentElement.parentElement.createSVGPoint();
        pt.x = e.pageX;  pt.y = e.pageY;
        pt = pt.matrixTransform(el.getScreenCTM().inverse());
    
        let new_x =  pt.x - figure.getAttribute('width')/2;
        let new_y =  pt.y - figure.getAttribute('height')/2;

        figure.setAttribute('x', new_x ); figure.setAttribute('y', new_y  );
        text.setAttribute('x',  new_x  ); text.setAttribute('y', new_y  );
    }
}

export function createDirectives(){
    Vue.directive('draggable', {
        inserted: function (el) {
            el.addEventListener('mouseup', (e) => mouseup(e, el))
            el.addEventListener('mouseout', (e) => mouseup(e, el))
            el.addEventListener('mousedown', (e) => mousedown(e, el))
            el.addEventListener('mousemove', (e) => mousemove(e, el))
        }
    });
}