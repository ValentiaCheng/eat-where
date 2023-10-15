import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import GridView from '@/views/GridView.vue'
import PageNotFoundView from '@/views/PageNotFoundView.vue'
import SingleView from '@/views/SingleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/grid',
      name: 'grid',
      component: GridView
    },
    {
      path: '/single',
      name: 'single',
      component: SingleView
    },
    { path: '/:catchAll(.*)', 
      component: PageNotFoundView
    }
  ]
})

export default router
