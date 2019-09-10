import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.$axios = axios;  //Vue实例对象继承原型的axios方法

import vant from 'vant'
import 'vant/lib/index.css'
Vue.use(vant)

import FastClick from 'fastclick'
FastClick.attach(document.body)

import './assets/fontIcon/iconfont'

import loadmore from './utils/loadMore'
Vue.directive('loadmore', loadmore)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')