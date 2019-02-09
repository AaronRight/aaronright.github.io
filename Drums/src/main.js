import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './App.vue';

import { v_store } from './main.vuex'
import { v_router } from './main.router'

Vue.use(Vuex);
Vue.use(VueRouter);

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

Vue.prototype.rhythm_sample = new RhythmSample();
const router = v_router()
export const store = v_store();

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
