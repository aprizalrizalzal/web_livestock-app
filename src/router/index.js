import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/profile/ProfileView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/user/UserView.vue'),
    },
    {
      path: '/livestocks',
      name: 'livestocks',
      component: () => import('@/views/livestock/LivestockView.vue'),
    },
    {
      path: '/livestocks/:id/detail',
      name: 'livestocks-detail',
      component: () => import('@/views/livestock/detail/LivestockDetailView.vue'),
    },
    {
      path: '/livestock/types',
      name: 'livestock-types',
      component: () => import('@/views/livestock_type/LivestockTypeView.vue'),
    },
    {
      path: '/livestock/species',
      name: 'livestock-species',
      component: () => import('@/views/livestock_type/livestock_species/LivestockSpeciesView.vue'),
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: () => import('@/views/transaction/TransactionView.vue'),
    },
    {
      path: '/payments',
      name: 'payments',
      component: () => import('@/views/payment/PaymentView.vue'),
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('@/views/report/ReportView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
  ],
});

export default router;
