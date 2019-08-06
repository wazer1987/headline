import mytest from '@/components/mytest.vue'
export default {
  install (Vue) {
    Vue.component(mytest.name, mytest)
  }
}
