import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/views/Hello'
import Home from '@/views/Home'
import MiddlewareService from '@/services/MiddlewareService'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      name: 'Home',
      path: '/home',
      component: Home,
      meta: {requiresAuth: true}
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if(localStorage.getItem("tokenWeb") == null){
      next('/')
    }else{
      await MiddlewareService.auth({
          token: localStorage.getItem("tokenWeb"),
        }).then((res) => {
          if (res.status === 200) {
            next()
          }else {
            next('/')
          }
        }).catch(() => {
          next('/')
        })
      }
    }else{
      next()
    }
})

export default router
