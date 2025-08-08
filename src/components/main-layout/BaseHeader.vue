<template>
  <header class="sticky top-0 z-10 flex items-center gap-4 border-b bg-background px-4 md:px-6">
    <div class="w-full flex items-center gap-4">
      <SidebarTrigger />
      <Separator
        orientation="vertical"
        class="h-4"
      />
      <Search />
    </div>
  </header>
</template>

<script setup lang="ts">
import { SidebarTrigger } from "../ui/sidebar";
import Search from "../basic-components/Search.vue";
import { Separator } from "../ui/separator";
</script>

<style scoped>
header {
  height: 56px;
}
</style>