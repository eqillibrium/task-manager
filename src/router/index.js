import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '../views/TaskList'

const routes = [
  {
    path: '/',
    name: 'Tasks',
    component: TaskList
  },
  {
    path: '/new',
    name: 'New',
    component: () => import(/* webpackChunkName: "about" */ '../views/NewTask')
  },
  {
    path: '/task/:id',
    name: 'Task',
    component: () => import(/* webpackChunkName: "about" */ '../views/Task')
  },
  {
    path: '/:notFound(.*)',
    name: 'notFound',
    component: () => import(/* webpackChunkName: "about" */ '../views/NotFound')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
