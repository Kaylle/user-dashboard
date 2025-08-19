<template>
  <RouterView />
  <Toaster />
</template>

<script setup lang="ts">
import "vue-sonner/style.css";
import { allColors } from "./lib/constants.ts";
import { Toaster } from "./components/ui/sonner";
import { onMounted } from "vue";
import { useCustomize } from "./lib/useCustomize.ts";

const { theme, radius } = useCustomize();

onMounted(() => {
  document.body.style.setProperty('--radius', `${radius.value}rem`);
  document.body.classList.remove(...allColors.map(color => `theme-${color}`));
  document.body.classList.add(`theme-${theme.value}`);
})
</script>