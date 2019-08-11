import mytest from '@/components/mytest.vue'
import mychannel from '@/components/mychannel.vue'
import myimg from '@/components/myimg.vue'
export default {
  install (Vue) {
    Vue.component(mytest.name, mytest)
    Vue.component(mychannel.name, mychannel)
    Vue.component(myimg.name, myimg)
  }
}
