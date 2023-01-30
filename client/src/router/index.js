import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/views/Hello'
import Home from '@/views/Home'
import Dashboard from '@/views/admin/Dashboard'
import Room from '@/views/admin/Room'
import RoomChat from '@/views/RoomChat'
import Appointement from '@/views/admin/Appointement'
import PageNotFound from '@/views/PageNotFound'
import MiddlewareService from '@/services/MiddlewareService'
import Navbar from '@/components/Navbar.vue'

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
      path: '/home',
      component: Home,
      meta: {requiresAuth: true},
      children: [
        {
          path: '',
          name: 'Home',
          component: Navbar
        }
      ]
    },
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      component: Dashboard,
      meta: {requiresAuthAdmin: true}
    },
    {
      name: 'Room',
      path: '/admin/room',
      component: Room,
      meta: {requiresAuthAdmin: true}
    },
    {
      name: 'RoomChat',
      path: '/room-chat/:name',
      component: RoomChat,
      meta: {requiresAuth: true}
    },
    {
      name: 'Appointement',
      path: '/admin/appointement',
      component: Appointement,
      meta: {requiresAuthAdmin: true}
    },
    {
      name: 'PageNotFound',
      path: '*',
      component: PageNotFound
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("tokenWeb") == null) {
      next('/')
    } else {
      await MiddlewareService.auth({
        token: localStorage.getItem("tokenWeb"),
      }).then((res) => {
        if (res.status === 200) {
          next()
        } else {
          next('/')
        }
      }).catch(() => {
        next('/')
      })
    }
  } else if (to.matched.some(record => record.meta.requiresAuthAdmin)) {
    if (localStorage.getItem("tokenWeb") == null) {
      next('/')
    } else {
      await MiddlewareService.auth({
        token: localStorage.getItem("tokenWeb"),
      }).then((res) => {
        if (res.status === 200 && res.data.user.user_role === 1) {
          next()
        } else {
          next('/')
        }
      }).catch(() => {
        next('/')
      })
    }
  } else {
    next()
  }
})

export default router
