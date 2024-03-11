import 'material-design-icons-iconfont/dist/material-design-icons.css'
import moment from 'moment'
import { VueMaskDirective } from 'v-mask'
import Vue from 'vue'
import VueMoment from 'vue-moment'
import App from './App.vue'
import axios from './axios'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
Vue.directive('mask', VueMaskDirective)
Vue.config.productionTip = false
Vue.use(VueMoment, { moment })

new Vue({
  router,
  store,
  vuetify,
  axios,
  render: (h) => h(App),
}).$mount('#app')
