import { themes } from "../lib/themes";
import { computed, ref } from "vue";
import { useColorMode } from "@vueuse/core";
import type { Theme } from "../lib/themes";
import type { Config } from "./models.ts";

export function useCustomize() {
  const config = ref({
    theme: 'zinc',
    radius: 0.5,
  } as Config);

  const { value: color } = useColorMode();
  const isDark = color === 'dark';
  const cache = localStorage.getItem("config");
  const themeClass = computed(() => `theme-${config.value.theme}`);
  const theme = computed(() => config.value.theme);
  const radius = computed(() => config.value.radius);

  if (cache) config.value = JSON.parse(cache);

  function setTheme(themeName: Theme['name']) {
    config.value.theme = themeName;
    localStorage.setItem("config", JSON.stringify(config.value));
  }

  function setRadius(newRadius: number) {
    config.value.radius = newRadius;
    localStorage.setItem("config", JSON.stringify(config.value));
  }

  const themePrimary = computed(() => {
    const t = themes.find(t => t.name === theme.value);
    return `hsl(${t?.cssVars[isDark ? 'dark' : 'light'].primary})`;
  })

  return {
    themeClass,
    theme,
    setTheme,
    radius,
    setRadius,
    themePrimary,
  };
}
