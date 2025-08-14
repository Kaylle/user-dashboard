<template>
  <header class="sticky top-0 z-10 flex items-center gap-4 border-b bg-background px-4 md:px-6">
    <div class="w-full flex items-center gap-4">
      <SidebarTrigger />
      <Separator
        orientation="vertical"
        class="separator-height"
      />
      <Search />
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          class="h-8 w-8"
          variant="outline"
        >
          <PhBellSimple />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="mr-5 notification-dropdown">
        <DropdownMenuLabel class="flex items-center justify-between">
          <div class="text-lg">Notification</div>
          <Button variant="outline" size="sm">
            Read all
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <template
            v-for="notification in api.notifications"
            :key="notification.id"
          >
            <DropdownMenuItem class="flex items-start gap-3">
              <div class="bg-accent p-2 rounded-lg">
                <PhInfo v-if="notification.type === 'info'"/>
              </div>
              <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                  <div class="font-medium">
                    {{ notification.name }}
                  </div>
                  <div class="flex items-center text-muted-foreground gap-1">
                    <PhCalendar class="text-primary"/> {{ notification.date }}
                  </div>
                </div>
                <p class="text-sm leading-tight text-muted-foreground">
                  {{ notification.description }}
                </p>
              </div>
              <div class="bg-accent p-1 rounded-sm cursor-pointer">
                <PhX :size="20"/>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </template>
        </DropdownMenuGroup>
        <DropdownMenuLabel class="flex justify-center">
          <Button
            variant="outline"
            @click="$router.push('/notifications')"
          >
            Show more
          </Button>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
</template>

<script setup lang="ts">
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { PhBellSimple, PhCalendar, PhInfo, PhX } from "@phosphor-icons/vue";
import { DropdownMenu, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import Search from "../basic-components/Search.vue";
import api from "../../lib/data.json";
</script>

<style scoped>
header {
  height: 56px;
}

.separator-height {
  height: 36px;
}

.notification-dropdown {
  max-width: 90vw !important;
  min-width: 100px !important;
}
</style>