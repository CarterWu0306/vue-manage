import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '商家首页',
        icon: 'dashboard'
      }
    }]
  },

  {
    path: '/menu',
    component: Layout,
    redirect: '/menu/index',
    children: [
      {
        path: '/menu/index',
        component: () => import('@/views/menu/index'),
        name: 'Foods',
        meta: { title: '点餐', icon: 'menu', }
      }
    ]
  },

  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/index',
    children: [
      {
        path: 'user-evaluation.vue',
        component: () => import('@/views/goods/index'),
        name: 'Goods',
        meta: { title: '商品管理', icon: 'shopping' }
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/index',
    children: [
      {
        path: '/order/index',
        component: () => import('@/views/order/index'),
        name: 'Order',
        meta: { title: '订单管理', icon: 'skill' }
      }
    ]
  },

  {
    path: '/evaluation',
    component: Layout,
    redirect: '/evaluation/user-evaluation',
    children: [
      {
        path: 'user-evaluation',
        component: () => import('@/views/evaluation/user-evaluation'),
        name: 'Evaluation',
        meta: { title: '评价管理', icon: 'like' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export const asyncRoutes = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    children: [
      {
        path: '/user/index',
        component: () => import('@/views/user/index'),
        name: 'User',
        meta: {
          title: '用户管理',
          icon: 'user',
          roles: ['ROLE_MANAGER']
        }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
