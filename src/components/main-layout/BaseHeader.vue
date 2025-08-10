<template>
  <header class="sticky top-0 z-10 flex items-center gap-4 border-b bg-background px-4 md:px-6">
    <div class="w-full flex items-center gap-4">
      <SidebarTrigger />
      <Separator
        orientation="vertical"
        style="height: 36px"
      />
      <Search />
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          class="h-8 w-8"
          variant="outline"
        >
          <PhBellSimple/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel class="flex items-center justify-between">
          <div class="text-lg">Notification</div>
          <Button variant="outline" size="sm">
            Read all
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <template
            v-for="notification in notifications"
            :key="notification.id"
          >
            <DropdownMenuItem
              class="flex items-start gap-3"
            >
              <div class="bg-accent p-2 mt-1.5 rounded-lg">
                <component :is="notification.icon"/>
              </div>
              <div class="column">
                <div class="flex items-center justify-between">
                  <div class="font-medium">
                    {{ notification.name }}
                  </div>
                  <div class="flex items-center gap-2">
                    <PhCalendar />
                    {{ notification.date }}
                    <PhX/>
                  </div>
                </div>
                <p class="text-sm leading-tight text-muted-foreground">
                  {{ notification.description }}
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
          </template>
        </DropdownMenuGroup>
        <DropdownMenuLabel class="flex justify-center">
          <Button variant="outline">
            Show more
          </Button>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
</template>

<script setup lang="ts">
import {SidebarTrigger} from "../ui/sidebar";
import Search from "../basic-components/Search.vue";
import { Separator } from "../ui/separator";
import {PhBellSimple, PhCalendar, PhInfo, PhX} from "@phosphor-icons/vue";
import {DropdownMenu, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem} from "../../components/ui/dropdown-menu";
import {Button} from "../../components/ui/button";

const notifications = [
  {
    id: "1",
    name: "shadcn/ui",
    description: "Beautifully designed components built with Radix UI and\n" +
      " Tailwind CSS.",
    icon: PhInfo,
    date: "2025-08-10 16:01"
  },
  {
    id: "2",
    name: "shadcn/ui",
    description: "Beautifully designed components built with Radix UI and\n" +
      " Tailwind CSS.",
    icon: PhInfo,
    date: "2025-08-10 16:01"
  }
]
</script>

<style scoped>
header {
  height: 56px;
}
</style>