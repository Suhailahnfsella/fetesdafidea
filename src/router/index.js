import { createRouter, createWebHistory } from 'vue-router';
import SignIn from '../views/SignIn.vue';
import Dashboard from '../views/Dashboard.vue';

const routes = [
  { path: '/', component: SignIn }, 
  { path: '/signin', component: SignIn }, 
  { 
    path: '/dashboard', 
    component: Dashboard, 
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('user');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/signin');
  } else {
    next();
  }
});

export default router;