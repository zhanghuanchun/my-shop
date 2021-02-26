import Vue from 'vue'
import 'lib-flexible'
import {
  Toast,
  Dialog,
  Button
} from 'vant';
import i18n from './i18n'


import App from './App.vue'
import router from './routers'
import store from './vuex/store'
import Header from './components/Header/Header'
import Star from './components/Star/Star'
import CartControl from './components/CartControl/CartControl'

import * as API from './api'
import './config/validation'
import './mock/mock_server'
import VueLazyload from 'vue-lazyload'
import loading from './common/images/loading.gif'
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Button)

Vue.use(VueLazyload, {
  loading,
})

// 将API对象挂载到Vue的原型对象上
Vue.prototype.$API = API
Vue.config.productionTip = false
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('CartControl', CartControl)



new Vue({
  render: h => h(App),
  router,
  i18n,
  store
}).$mount('#app')