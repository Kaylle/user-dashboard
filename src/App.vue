<template>
  <RouterView />
  <Toaster />
</template>

<script setup lang="ts">
import "vue-sonner/style.css";
import { allColors } from "./lib/constants.ts";
import { Toaster } from "./components/ui/sonner";
import { watch } from "vue";
import { useCustomize } from "./lib/useCustomize.ts";

const { theme, radius } = useCustomize();

watch(theme, () => {
  setClassTheme();
});

watch(radius, () => {
  setStyleRadius();
});

const setClassTheme = () => {
  document.body.classList.remove(...allColors.map(color => `theme-${color}`));
  document.body.classList.add(`theme-${theme.value}`);
};

const setStyleRadius = () => {
  document.body.style.setProperty('--radius', `${radius.value}rem`);
};
</script>