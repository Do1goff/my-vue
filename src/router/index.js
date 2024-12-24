import AuthView from '@/views/AuthView.vue'
import ComponentView from '@/views/ComponentView.vue'
import ExportDocuments from '@/views/ExportDocuments.vue'
import Holes from '@/views/Holes.vue'
import HomeView from '@/views/HomeView.vue'
import MultiQuery from '@/views/MultiQuery.vue'
import Upload from '@/views/Upload.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
import AbitView from '../views/AbitView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/abit',
    name: 'home',
    props: true,
    component: HomeView,
    meta: { requiresAuth: true },
    children: [
      {
        path: ':id',
        name: 'abit',
        props: true,
        component: AbitView,
        children: [
          {
            path: ':component',
            name: 'component',
            props: true,
            component: ComponentView,
          },
        ],
      },
    ],
  },
  {
    path: '/location',
    name: 'Location',
    component: Location,
  },
  {
    path: '/query',
    name: 'Query',
    component: MultiQuery,
    meta: { requiresAuth: true },
  },
  {
    path: '/holes',
    name: 'Holes',
    component: Holes,
    meta: { requiresAuth: true },
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload,
    meta: { requiresAuth: true },
  },
  {
    path: '/exportDocuments',
    name: 'ExportDocuments',
    component: ExportDocuments,
    meta: { requiresAuth: true },
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const userToken = JSON.parse(sessionStorage.getItem('user'))?.username
  if (requiresAuth) {
    if (userToken != undefined) {
      next()
    } else {
      next('/auth')
    }
  } else {
    next()
  }
})
export default router
