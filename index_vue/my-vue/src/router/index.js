import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

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
      'header': () => import('../views/MyNav'),
      // 'footer':Footer
    }
  },
  {
    path: '/drugs',
    components: {
      default: () => import('@/views/Drugs.vue'),
      'header': () => import('../views/MyNav'),
      // 'footer':Footer
    }
  },
  {
    path: '/detail',
    components: {
      default: () => import('@/views/Detail.vue'),
      'header': () => import('../views/MyNav'),

    }
  },
  {
    path: '/shopping',
    components: {
      default: () => import('@/views/Shopping.vue'),
      'header': () => import('../views/MyNav'),

    }
  },
  {
    path: '/pay',
    components: {
      default: () => import('@/views/Pay.vue'),
      'header': () => import('../views/MyNav'),

    }
  },
  {
    path: '/quick',
    components: {
      default: () => import('@/views/Quick.vue'),
      'header': () => import('../views/MyNav'),

    }
  },
  {
    path: '/about',
    components: {
      default: () => import('@/views/About.vue'),
      'header': () => import('../views/MyNav'),

    }
  },
  {
    path: '/consult',
    components: {
      default: () => import('@/views/Consult.vue'),
      'header': () => import('../views/MyNav'),

    }
  },
  {
    path: '/virus',
    components: {
      default: () => import('@/views/Virus.vue'),
      'header': () => import('../views/MyNav'),

    },
    children: [
      {
        path: 'domestic',
        component: () => import('@/views/Domestic.vue')
      },
      {
        path: 'abroad',
        component: () => import('@/views/Abroad.vue')
      }
    ]
  },
  {
    path: '/nous',
    components: {
      default: () => import('@/views/Nous.vue'),
      'header': () => import('../views/MyNav'),

    }
  },
  {
    path: '/detailAssey',
    components: {
      default: () => import('@/views/DetailAssey.vue'),
      'header': () => import('../views/MyNav'),

    }
  },
  {
    path: '/mess_detail',
    components: {
      default: () => import('@/views/Mess_detail.vue'),
      'header': () => import('../views/MyNav'),
    }
  },
  {
    path: '/news_detail',
    components: {
      default: () => import('@/views/News_detail.vue'),
      'header': () => import('../views/MyNav'),
    }
  },
  {
    path: '/personal',
    components: {
      default: () => import('@/views/Personal.vue'),
      'header': () => import('../views/MyNav'),
    },
    children: [
      {
        path: 'order',
        component: () => import('@/views/Order.vue')
      },
      {
        path: 'sale',
        component: () => import('@/views/Sale.vue')
      },
      {
        path: 'data',
        component: () => import('@/views/Data.vue')
      },
      {
        path: 'address',
        component: () => import('@/views/Address.vue')
      }
    ]
  },
  { path: '/login', 
    component: Login,
  
  },
  { path: '/register', component: Register },


]

const router = new VueRouter({
  base:'/dist',
  mode: 'hash',
  routes
})

export default router
