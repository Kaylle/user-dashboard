<template>
  <div class="w-full flex flex-col gap-4">
    <div>
      <h2 class="text-2xl font-bold tracking-tight">
        Settings
      </h2>
      <p class="text-muted-foreground">
        Manage your account settings and appearance preferences.
      </p>
    </div>
    <Separator />
    <main class="flex flex-col lg:flex-row space-y-6 lg:space-x-12 lg:space-y-0">
      <div class="w-full overflow-x-auto pb-2 lg:w-1/6 lg:pb-0">
        <nav class="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1">
          <Button
            v-for="item in settingsNavItems"
            :key="item.title"
            variant="ghost"
            class="w-full text-left justify-start items-start"
            :class="activeTab === item.title && 'bg-muted hover:bg-muted'"
            as-child
            @click="activeTab = item.title"
          >
            <a>
              {{ item.title }}
            </a>
          </Button>
        </nav>
      </div>
      <AppearanceTab
        v-if="activeTab === 'Appearance'"
      />
      <div
        v-if="activeTab === 'Profile'"
        class="flex-1 lg:max-w-2xl"
      >
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium">
              Profile
            </h3>
            <p class="text-muted-foreground text-sm">
              This is how others will see you on the site.
            </p>
          </div>
          <Separator />
          <UserForm
            v-if="useAuthStore().user"
            :data="formData"
            @save="onSave"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { settingsNavItems } from "../lib/constants.ts";
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/authStore.ts";
import type { UserType } from "../lib/models.ts";
import AppearanceTab from "../components/basic-components/AppearanceTab.vue";
import UserForm from "../components/basic-components/UserForm.vue";
import {toast} from "vue-sonner";

const activeTab = ref('Profile');
const formData = ref(useAuthStore().user as UserType | null);

const onSave = (data: UserType) => {
  formData.value = {...data};
  useAuthStore().user = data;
  toast('Successfully Saved!');
};

onMounted(() => {
  useAuthStore().getUser();
  if (useAuthStore().user)
    formData.value = useAuthStore().user;
});
</script>
