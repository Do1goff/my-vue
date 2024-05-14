import Achievements from '@/components/Achievements.vue'
import Admission from '@/components/Admission.vue'
import Documents from '@/components/Documents.vue'
import FirstInfo from '@/components/FirstInfo.vue'
import Military from '@/components/Military.vue'
import Results from '@/components/Results.vue'
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
    path: '/abitEdit/:id/',
    name: 'abitEdit',
    props: true,
    component: AbitEditView,
    children: [
      {
        path: 'firstInfo',
        name: 'FirstInfo',
        props: true,
        component: FirstInfo,
      },
      {
        path: 'results',
        name: 'Results',
        props: true,
        component: Results,
      },
      {
        path: 'documents',
        name: 'Documents',
        props: true,
        component: Documents,
      },
      {
        path: 'military',
        name: 'Military',
        props: true,
        component: Military,
      },
      {
        path: 'admission',
        name: 'Admission',
        props: true,
        component: Admission,
      },
      {
        path: 'achievements',
        name: 'Achievements',
        props: true,
        component: Achievements,
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
