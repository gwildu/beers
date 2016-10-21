'use strict'

// babel polyfills for Promise, Object.assign, etc.
import 'core-js/fn/promise'

import Vue from 'vue'
import routes from 'app_routing'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import vuexModules from 'app_vuex'
import Vuex from 'vuex'
import App from './app.vue'

global.Promise = Promise

Vue.use(VueRouter)
var router = new VueRouter({ routes })

Vue.use(Vuex)
var store = new Vuex.Store({ modules: vuexModules })

// sync store between pages / routings
sync(store, router)

var app = new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
  store
})

export default { app, router, store }
