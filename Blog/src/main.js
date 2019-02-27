import Vue from 'vue';

import Vuex from 'vuex';
import VueRouter from 'vue-router';
Vue.use(Vuex);
Vue.use(VueRouter);

import { v_store } from './main.vuex'
import { v_router } from './main.router'
const router = v_router()
const store = v_store();

import { Blog } from './blog';
import { FlowChart } from './flowchart';

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(FlowChart)
});