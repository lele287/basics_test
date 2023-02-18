import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export const routes = [
  {
    path: '/',
    components: {
      default: () => import('@/views/Index'),
    }
  },
  {
    path: '/Introduce',
    components: {
      default: () => import('@/views/Introduce'),
    }
  },
  {
    path: '/Info',
    components: {
      default: () => import('@/views/Info'),
    }
  },
  {
    path: '/Recruit',
    components: {
      default: () => import('@/views/Recruit'),
    },
  },
  {
    path: '/Cooperation',
    components: {
      default: () => import('@/views/Cooperation'),
    }
  },
  {
    path: '/Message',
    components: {
      default: () => import('@/views/Message'),
    }
  },
  {
    path: '/OnlineRegistration',
    components: {
      default: () => import('@/views/OnlineRegistration'),
    }
  },
]

const router = new VueRouter({
  base:'/dist_education',
  mode: 'hash',
  routes
})

export default router
