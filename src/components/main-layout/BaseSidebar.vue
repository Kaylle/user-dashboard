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
            <SidebarMenuItem
              v-for="(nav, indexGroup) in navMenu"
              :key="indexGroup"
            >
              <SidebarMenuButton asChild>
                <a :href="nav.url">
                  <component :is="icons[nav.icon]" />
                  <span>{{ nav.title}} </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
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
                    :src="user.avatar"
                    :alt="user.fullName"
                  />
                  <AvatarFallback class="rounded-lg">
                    {{ user.fullName.split(' ').map((n) => n[0]).join('') }}
                  </AvatarFallback>
                </Avatar>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">
                    {{ user.fullName }}
                  </span>
                  <span class="truncate text-xs">
                    {{ user.email }}
                  </span>
                </div>
                <PhCaretUp class="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              class="w-[--reka-popper-anchor-width]"
            >
              <DropdownMenuItem disabled>
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem @click="logout">
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
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarFooter, SidebarRail, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { PhCaretUp, PhFile, PhLock, PhHouse, PhImage } from "@phosphor-icons/vue";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { useRouter } from "vue-router";
import { navMenu } from "@/lib/constants.ts";
import type {UserType} from "@/lib/models.ts";

const router = useRouter();

const icons = {
  "PhFile": PhFile,
  "PhLock": PhLock,
  "PhHouse": PhHouse
};

const user = {
  fullName: 'Kate Kaylle',
  email: 'kurkina.ee@gmail.com',
  avatar: '/vite.svg',
  phone: '',
  id: '1',
  position: 'front-end developer',
  status: 'active'
} as UserType;

const logout = () => {
  //clear pinia
  router.push('/login');
};
</script>