<template>
  <div class="flex-1 lg:max-w-2xl">
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-medium">
          Appearance
        </h3>
        <p class="text-muted-foreground text-sm">
          Customize the appearance of the app. Automatically switch between day and night themes.
        </p>
      </div>
      <Separator />
      <div class="grid gap-6">
        <div class="space-y-1.5">
          <Label class="text-xl mb-4">
            Color
          </Label>
          <div class="grid grid-cols-3 gap-2">
            <template
              v-for="color in themes"
              :key="color"
            >
              <Button
                class="justify-start gap-2"
                :variant="theme === color.name?'default':'outline'"
                @click="setTheme(color.name)"
              >
                <span
                  class="h-5 w-5 flex items-center justify-center rounded-full bg-white"
                  :style="theme !== color.name ? { backgroundColor: backgroundColor(color.name) } : ''"
                >
                  <PhCheck
                    v-if="theme === color.name"
                    :size="16"
                    class="text-primary"
                  />
                </span>
                <span class="text-xs capitalize">
                  {{ color.name }}
                </span>
              </Button>
            </template>
          </div>
        </div>
        <div class="space-y-1.5">
          <Label class="text-xl mb-4">
            Radius
          </Label>
          <div class="grid grid-cols-5 gap-2">
            <template
              v-for="r in RADII"
              :key="r"
            >
              <Button
                class="justify-center gap-2"
                :variant="radius === r?'default':'outline'"
                @click="setRadius(r)"
              >
                <span class="text-xs capitalize">
                  {{ r }}
                </span>
              </Button>
            </template>
          </div>
        </div>
        <div class="space-y-1.5">
          <Label class="text-xl mb-4">
            Theme
          </Label>
          <div class="grid grid-cols-3 gap-2">
            <Button
              class="justify-center gap-2"
              :variant="colorMode === 'light'?'default':'outline'"
              @click="colorMode = 'light'"
            >
              <PhSun :size="16" weight="bold" />
              <span class="text-xs capitalize">
                Light
              </span>
            </Button>
            <Button
              class="justify-center gap-2"
              :variant="colorMode === 'dark'?'default':'outline'"
              @click="colorMode = 'dark'"
            >
              <PhMoon :size="16" />
              <span class="text-xs capitalize">
                Dark
              </span>
            </Button>
            <Button
              class="justify-center gap-2"
              :variant="colorMode === 'auto'?'default':'outline'"
              @click="colorMode = 'auto'"
            >
              <PhMonitor :size="16" />
              <span class="text-xs capitalize">
                System
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Separator } from "../../components/ui/separator";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { PhCheck, PhMonitor, PhMoon, PhSun } from "@phosphor-icons/vue";
import { themes } from "@/lib/constants.ts";
import { useColorMode } from "@vueuse/core";
import { useCustomize } from "@/lib/useCustomize.ts";
import { watch } from "vue";
import type { Color } from "@/lib/models.ts";

const { theme, radius, setTheme, setRadius } = useCustomize();
const RADII = [0, 0.25, 0.5, 0.75, 1];
const colorMode = useColorMode();

watch(theme, () => {
  setClassTheme();
});

watch(radius, () => {
  setStyleRadius();
});

const setClassTheme = () => {
  document.body.classList.remove(...themes.map(color => `theme-${color.name}`));
  document.body.classList.add(`theme-${theme.value}`);
};

const setStyleRadius = () => {
  document.body.style.setProperty('--radius', `${radius.value}rem`);
};

const backgroundColor = (color: Color) => {
  const t = themes.find(t => t.name === color);
  if (t) return `hsl(${t.color})`;
  else return `hsl(0,0,0)`;
};
</script>
