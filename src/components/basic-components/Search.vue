<template>
  <SidebarMenuButton
    as-child
    tooltip="Search"
    class="search-w"
  >
    <Button
      variant="outline"
      size="sm"
      class="text-xs"
      @click="openCommand = !openCommand"
    >
      <PhMagnifyingGlass />
      <span class="font-normal group-data-[collapsible=icon]:hidden">
        Search...
      </span>
      <div class="ml-auto flex items-center space-x-0.5 group-data-[collapsible=icon]:hidden">
        <BaseKbd>⌘</BaseKbd>
        <BaseKbd>K</BaseKbd>
      </div>
    </Button>
  </SidebarMenuButton>
  <CommandDialog v-model:open="openCommand">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>
        No results found.
      </CommandEmpty>
      <CommandGroup heading="Sidebar layout">
        <CommandItem
          value="Home"
          @click="handleRouter('/')"
        >
          Home
          <CommandShortcut>
            <BaseKbd>⌘</BaseKbd>
            <BaseKbd>H</BaseKbd>
          </CommandShortcut>
        </CommandItem>
        <CommandItem
          value="page"
          @click="handleRouter('page')"
        >
          Empty Page
          <CommandShortcut>
            <BaseKbd>⌘</BaseKbd>
            <BaseKbd>E</BaseKbd>
          </CommandShortcut>
        </CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Authentification layout">
        <CommandItem
          value="login"
          @click="handleRouter('login')"
          select
        >
          Login
          <CommandShortcut>
            <BaseKbd>⌘</BaseKbd>
            <BaseKbd>L</BaseKbd>
          </CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>

<script setup lang="ts">
import { PhMagnifyingGlass } from "@phosphor-icons/vue";
import { SidebarMenuButton } from "../ui/sidebar";
import { Button } from "../ui/button";
import { CommandDialog, CommandInput, CommandList, CommandGroup, CommandItem, CommandShortcut, CommandEmpty, CommandSeparator } from "../ui/command";
import { ref, watch } from "vue";
import { useMagicKeys } from "@vueuse/core";
import { useRouter } from "vue-router";
import BaseKbd from "../basic-components/BaseKbd.vue";

const router = useRouter();
const openCommand = ref<boolean>(false);

const { Meta_K, Ctrl_K, Meta_H, Ctrl_H, Meta_E, Ctrl_E, Meta_L, Ctrl_L } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if ((e.key === "k" || e.key === 'h' || e.key === 'e' || e.key === 'l') && (e.metaKey || e.ctrlKey))
      e.preventDefault();
  }
});

const handleRouter = (path: string) => {
  router.push(path);
  openCommand.value = !openCommand.value;
};

watch([Meta_K, Ctrl_K, Meta_H, Ctrl_H, Meta_E, Ctrl_E, Meta_L, Ctrl_L], (v) => {
  if (v[0] || v[1])
    openCommand.value = !openCommand.value;
  if (v[2] || v[3])
    handleRouter('/');
  if (v[4] || v[5])
    handleRouter('/page');
  if (v[6] || v[7])
    handleRouter('/login');
});
</script>

<style scoped>
.search-w {
  max-width: 250px;
}
</style>