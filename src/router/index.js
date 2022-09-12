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
  // 登录
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // 设置
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  },
  // 计划
  {
    path: '/plan',
    name: 'Plan',
    component: Plan
  },
  // 回收站
  {
    path: '/recycle',
    name: 'Recycle',
    component: Recycle
  },
  // 文档
  {
    path: '/library',
    name: 'Library',
    component: Library
  },
  // 404路由
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
