<template>
  <SidebarProvider>
    <BaseSidebar />
    <SidebarInset>
      <BaseHeader />
      <div class="min-w-0 w-full flex-1 overflow-x-auto p-4 lg:p-6">
        <RouterView />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup lang="ts">
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { useAuthStore } from "../../stores/authStore.ts";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import BaseSidebar from "./BaseSidebar.vue";
import BaseHeader from "./BaseHeader.vue";

const router = useRouter();

onMounted(() => {
  const isAuth = useAuthStore().getUser();
  if (!isAuth) router.push("/login");
});
</script>
