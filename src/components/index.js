import mytest from '@/components/mytest.vue'
import mychannel from '@/components/mychannel.vue'
export default {
  install (Vue) {
    Vue.component(mytest.name, mytest)
    Vue.component(mychannel.name, mychannel)
  }
}
