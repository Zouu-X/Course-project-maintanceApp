import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '/login',
    component: () => import('@/views/Login_page/LogIn.vue')
  },
  {
    path: '/manager',
    name: '/manager',
    component: () => import('@/views/main_page/components/ManagerMain.vue')
  },
  {
    path: '/worker',
    name: '/worker',
    component: () => import('@/views/main_page/components/WorkerMain.vue')
  },
  {
    path: '/facility',
    name: '/facility',
    component: () => import('@/views/Facility_management/index.vue')
  },
  {
    path: '/M3',
    name: '/M3',
    component: () => import('@/views/Facility_management/M3/MTest.vue')
  },
  {
    path: '/M5',
    name: '/M5',
    component: () => import('@/views/Facility_management/M5/MFive.vue')
  },
  {
    path: '/elec',
    name: '/elec',
    component: () => import('@/views/Facility_management/WaiZhi/WaiZhi.vue')
  },
  {
    path: '/huangpu-ku',
    name: '/huangpu-ku',
    component: () => import('@/views/Facility_management/HuangpuLiTi/LiTi.vue')
  },
  {
    path: '/huadu-ku',
    name: '/huadu-ku',
    component: () => import('@/views/Facility_management/Huadu-Liti/LiTi.vue')
  },
  {
    path: '/huadu-kong',
    name: '/huadu-kong',
    component: () => import('@/views/Facility_management/HuaduKong/HuaduKong.vue')
  },
  {
    path: '/huangpu-kong',
    name: '/huangpu-kong',
    component: () => import('@/views/Facility_management/HuangpuKong/HuangpuKong.vue')
  },
  {
    path: '/chuqi',
    name: '/chuqi',
    component: () => import('@/views/Facility_management/ChuQi/ChuQi.vue')
  },
  {
    path: '/checkin',
    name: '/checkin',
    component: () => import('@/views/Daka_page/CaLendar.vue')
  },
  {
    path: '/personnel',
    name: '/personnel',
    component: () => import('@/views/Renyuan_page/renYuan.vue')
  },
  {
    path: '/message',
    name: '/message',
    component: () => import('@/views/Message_page/xiaoXiZhongXin.vue')
  },
  {
    path: '/material',
    name: '/material',
    component: () => import('@/views/Material_page/wuLiao.vue')
  },
  {
    path: '/monitor',
    name: '/monitor',
    component: () => import('@/views/monitor_page/MonitorTest.vue')
  },
  {
    path: '/linkx',
    name: '/linkx',
    component: () => import('@/views/monitor_page/monitor_details/RuXian.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
