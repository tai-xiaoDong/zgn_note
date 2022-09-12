import Vue from 'vue'
import VueRouter from 'vue-router'
import Library from '@/views/Library'
import Setting from '@/views/Setting'
import Recycle from '@/views/Recycle'
import Plan from '@/views/Plan'
import Login from '@/views/Login'
import NotFound from '@/views/NotFound'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'Login',
    component: Login
  },
  {
    path: '/setting',
    // name: 'Setting',
    component: Setting
  },
  {
    path: '/plan',
    // name: 'Plan',
    component: Plan
  },
  {
    path: '/recycle',
    // name: 'Recycle',
    component: Recycle
  },
  {
    path: '/library',
    // name: 'Library',
    component: Library
  },
  {
    path: '*',
    // name: 'NotFound',
    component: NotFound
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
