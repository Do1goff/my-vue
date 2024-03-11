import Vue from 'vue'
import VueRouter from 'vue-router'
import AbitEditView from '../views/AbitEditView.vue'
import AbitView from '../views/AbitView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/abit/:id',
    name: 'abit',
    props: true,
    component: AbitView,
  },
  {
    path: '/abitEdit/:id',
    name: 'abitEdit',
    props: true,
    component: AbitEditView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
