import Vue from 'vue';

import Vuex from 'vuex';
import VueRouter from 'vue-router';
Vue.use(Vuex);
Vue.use(VueRouter);

import { v_store } from './main.vuex'
import { v_router } from './main.router'
import { createDirectives } from './main.directives'

const router = v_router()
const store = v_store();
createDirectives();

import { Blog } from './blog';
import FlowChart from './flowchart/FlowChart.vue';

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(FlowChart)
});