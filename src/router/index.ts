import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import EmptyPage from '../pages/EmptyPage.vue';
import MainLayout from "../components/main-layout/MainLayout.vue";

const routes = [
  { path: '/login', component: LoginPage },
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '/', component: MainPage },
      { path: '/page', component: EmptyPage }
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;