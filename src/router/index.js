import ComponentView from '@/views/ComponentView.vue'
import HomeView from '@/views/HomeView.vue'
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
