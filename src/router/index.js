import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home/Home.vue'

let router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/blue',
      component: () => import('../views/Blue/Blue.vue')
    },
    {
      path: '/plane',
      component: () => import('../views/Plane/Plane.vue')
    },
    {
      path: '/truck',
      component: () => import('../views/Truck/Truck.vue')
    }
  ]
});

export default router