import { ref } from "vue";
import { defineStore } from "pinia";
import type { UserType } from "../lib/models.ts";

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserType | null>(null);

  function getUser() {
    const res = localStorage.getItem("user");
    if (res) {
      user.value = JSON.parse(res);
      return true;
    } else {
      return false;
    }
  }

  function login(email: string, password: string) {
    if (email === 'kurkina.ee@gmail.com' && password === '1234') {
      user.value = {
        fullName: 'Kate Kaylle',
        email: 'kurkina.ee@gmail.com',
        avatar: '/icons/favicon-32x32.png',
        phone: '+7 (996) 590-14-45',
        id: '1',
        position: 'front-end developer',
        status: 'active'
      };
      localStorage.setItem("user", JSON.stringify(user.value));
      return true;
    } else {
      return false;
    }
  }

  function logout() {
    localStorage.removeItem("user");
    user.value = null;
  }

  return { user, login, logout, getUser };
})