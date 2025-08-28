<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div class="aspect-square size-8 flex items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <PhImage class="size-4" />
            </div>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">
                User Dashboard Inc.
              </span>
              <span class="truncate text-xs">
                User dashboard
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <div
              v-for="group in new Set(navMenu.map(x => x.group))"
              :key="group"
            >
              <SidebarGroupLabel>
                {{ group }}
              </SidebarGroupLabel>
              <SidebarMenuItem
                v-for="(nav, indexGroup) in navMenu.filter(x => x.group === group)"
                :key="indexGroup"
                class="rounded-md"
                :class="nav.url === $route.path ? 'bg-accent' : ''"
              >
                <SidebarMenuButton as-child>
                  <router-link :to="nav.url">
                    <component :is="nav.icon" />
                    <span>{{ nav.title}} </span>
                  </router-link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </div>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar class="h-8 w-8 rounded-lg">
                  <AvatarImage
                    :src="useAuthStore().user?.avatar || ''"
                    :alt="useAuthStore().user?.fullName"
                  />
                  <AvatarFallback class="rounded-lg">
                    {{ useAuthStore().user?.fullName.split(' ').map((n) => n[0]).join('') }}
                  </AvatarFallback>
                </Avatar>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">
                    {{ useAuthStore().user?.fullName }}
                  </span>
                  <span class="truncate text-xs">
                    {{ useAuthStore().user?.email }}
                  </span>
                </div>
                <PhCaretUp class="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              class="w-[--reka-popper-anchor-width]"
            >
              <DropdownMenuItem>
                <PhUserCircleGear />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <PhGearSix />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem @click="logout">
                <PhSignOut />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>

<script setup lang="ts">
import { SidebarGroupLabel, Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarFooter, SidebarRail, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { PhCaretUp, PhImage, PhUserCircleGear, PhGearSix, PhSignOut } from "@phosphor-icons/vue";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { navMenu } from "@/lib/constants.ts";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore.ts";

const router = useRouter();

const logout = () => {
  useAuthStore().logout();
  router.push('/login');
};
</script>