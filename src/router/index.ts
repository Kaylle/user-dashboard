import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../pages/MainPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import EmptyPage from "../pages/EmptyPage.vue";
import MainLayout from "../components/main-layout/MainLayout.vue";
import SettingsPage from "../pages/SettingsPage.vue";
import ErrorPage from "../pages/ErrorPage.vue";
import NotificationPage from "../pages/NotificationPage.vue";

const routes = [
  { path: '/login', component: LoginPage },
  { path: '/error404', component: ErrorPage },
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '/', component: MainPage },
      { path: '/page', component: EmptyPage },
      { path: '/settings', component: SettingsPage },
      { path: '/notifications', component: NotificationPage }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;