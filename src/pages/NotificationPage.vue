<template>
  <div class="w-full flex flex-col gap-4">
    <div>
      <h2 class="text-2xl font-bold tracking-tight">
        Notifications
      </h2>
      <p class="text-muted-foreground">
        Manage your account notifications here.
      </p>
    </div>
    <Separator />
    <main class="flex flex-col space-y-3 lg:space-x-12">
      <div
        class="w-full flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
        v-for="notification in api.notifications"
        :key="notification.id"
      >
        <div class="w-full flex flex-col gap-1">
          <div class="flex items-center">
            <div class="flex items-center gap-2">
              <div class="font-semibold">
                {{ notification.name }}
              </div>
              <span class="h-2 w-2 flex rounded-full bg-primary" />
            </div>
            <div class="ml-auto text-xs Create new scratch file from selection">
              {{ notification.date }}
            </div>
          </div>
          <div class="text-xs font-medium">
            {{ notification.type }}
          </div>
        </div>
        <div class="line-clamp-2 text-xs text-muted-foreground">
          {{ notification.description.substring(0, 300) }}
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import api from "../lib/data.json";
import { Separator } from "../components/ui/separator";
</script>