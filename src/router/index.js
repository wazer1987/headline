import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/login.vue'
import home from '@/views/home/home.vue'
import welcome from '@/views/welcome/welcom.vue'
import article from '@/views/article/article.vue'
import notfound from '@/views/404/notfound.vue'
import stor from '../stor/stor.js'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/',
      name: 'home',
      component: home,
      children: [
        { path: '', name: 'welcome', component: welcome },
        { path: '/article', name: 'article', component: article }
      ]
    },
    { path: '*', component: notfound }

  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  if (!stor.getUser().token) return next('/login')
  next()
})
export default router
