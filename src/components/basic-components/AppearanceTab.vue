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
              v-for="color in allColors"
              :key="color"
            >
              <Button
                class="justify-start gap-2"
                variant="outline"
                :class="{ 'border-primary border-2': theme === color }"
                @click="setTheme(color)"
              >
                <span
                  class="h-5 w-5 flex items-center justify-center rounded-full"
                  :style="{ backgroundColor: backgroundColor(color) }"
                >
                  <PhCheck
                    v-if="theme === color"
                    :size="16"
                    class="text-white"
                  />
                </span>
                <span class="text-xs capitalize">
                  {{ color }}
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
                variant="outline"
                :class="{ 'border-primary border-2': radius === r }"
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
              variant="outline"
              :class="{ 'border-primary border-2': colorMode === 'light' }"
              @click="colorMode = 'light'"
            >
              <PhSun :size="16" weight="bold" />
              <span class="text-xs capitalize">
                Light
              </span>
            </Button>
            <Button
              class="justify-center gap-2"
              variant="outline"
              :class="{ 'border-primary border-2': colorMode === 'dark' }"
              @click="colorMode = 'dark'"
            >
              <PhMoon :size="16" />
              <span class="text-xs capitalize">
                Dark
              </span>
            </Button>
            <Button
              class="justify-center gap-2"
              variant="outline"
              :class="{ 'border-primary border-2': colorMode === 'auto' }"
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
import { themes } from "../../lib/themes.ts";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { PhCheck, PhMonitor, PhMoon, PhSun } from "@phosphor-icons/vue";
import { allColors } from "../../lib/constants.ts";
import { useColorMode } from "@vueuse/core";
import { useCustomize } from "../../lib/useCustomize.ts";
import { watch } from "vue";
import type { Color } from "../../lib/models.ts";

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
  document.body.classList.remove(...allColors.map(color => `theme-${color}`));
  document.body.classList.add(`theme-${theme.value}`);
};

const setStyleRadius = () => {
  document.body.style.setProperty('--radius', `${radius.value}rem`);
};

const backgroundColor = (color: Color) => {
  const bg = themes.find(theme => theme.name === color);
  return `hsl(${bg?.activeColor.light})`;
};
</script>
