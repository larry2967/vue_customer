import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/info',
    name: 'Info',
    component: () => import(/* webpackChunkName: "about" */ '../views/Info.vue')
  },
  {
    path: '/potential',
    name: 'PotentialCustomers',
    component: () => import(/* webpackChunkName: "about" */ '../views/PotentialCustomers.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
