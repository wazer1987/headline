import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import './style/index.less'
import axios from './api/axios.js'
import myplugin from '@/components/index.js'
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(myplugin)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
