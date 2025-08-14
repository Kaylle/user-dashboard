<template>
  <div class="w-full flex flex-col gap-4">
    <div>
      <h2 class="text-2xl font-bold tracking-tight">
        Settings
      </h2>
      <p class="text-muted-foreground">
        Manage your account settings and appearance preferences.
      </p>
    </div>
    <Separator />
    <main class="flex flex-col lg:flex-row space-y-6 lg:space-x-12 lg:space-y-0">
      <div class="w-full overflow-x-auto pb-2 lg:w-1/6 lg:pb-0">
        <nav class="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1">
          <Button
            v-for="item in settingsNavItems"
            :key="item.title"
            variant="ghost"
            class="w-full text-left justify-start items-start"
            :class="activeTab === item.title && 'bg-muted hover:bg-muted'"
            as-child
            @click="activeTab = item.title"
          >
            <a>
              {{ item.title }}
            </a>
          </Button>
        </nav>
      </div>
      <div
        v-if="activeTab === 'Appearance'"
        class="flex-1 lg:max-w-2xl"
      >
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
      <div
        v-if="activeTab === 'Profile'"
        class="flex-1 lg:max-w-2xl"
      >
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium">
              Profile
            </h3>
            <p class="text-muted-foreground text-sm">
              This is how others will see you on the site.
            </p>
          </div>
          <Separator />
          <form v-if="formData">
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name">Full name</Label>
                <Input
                  required
                  id="name"
                  v-model="formData.fullName"
                  class="col-span-3"
                />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="position">Position</Label>
                <Input
                  required
                  id="position"
                  v-model="formData.position"
                  class="col-span-3"
                />
              </div>
              <FormField name="status">
                <FormItem>
                  <Combobox by="label" v-model="formData.status">
                    <FormControl>
                      <ComboboxAnchor class="w-full">
                        <div class="grid grid-cols-4 items-center gap-4">
                          <FormLabel for="status">Status</FormLabel>
                          <div class="col-span-3">
                            <ComboboxTrigger class="w-full">
                              <Button
                                type="button"
                                variant="outline"
                                class="justify-between w-full"
                              >
                                {{ formData.status ?? 'Select status' }}
                                <PhCaretUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </ComboboxTrigger>
                          </div>
                        </div>
                      </ComboboxAnchor>
                    </FormControl>
                    <ComboboxList>
                      <ComboboxGroup>
                        <ComboboxItem
                          v-for="status in [
                            'active',
                            'blocked'
                          ]"
                          :key="status"
                          :value="status"
                          @click="formData.status = status"
                        >
                          {{ status }}
                          <ComboboxItemIndicator>
                            <PhCheck :class="cn('ml-auto h-4 w-4')" />
                          </ComboboxItemIndicator>
                        </ComboboxItem>
                      </ComboboxGroup>
                    </ComboboxList>
                  </Combobox>
                </FormItem>
              </FormField>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="email">Email</Label>
                <Input
                  required
                  type="email"
                  id="email"
                  v-model="formData.email"
                  class="col-span-3"
                />
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="phone">Phone</Label>
                <Input
                  required
                  type="tel"
                  id="phone"
                  v-model="formData.phone"
                  class="col-span-3"
                />
              </div>
            </div>
            <Button
              cclick="save"
              type="submit"
            >
              Save changes
            </Button>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Separator } from "../components/ui/separator";
import { themes } from "../lib/themes.ts";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { PhCaretUpDown, PhCheck, PhMonitor, PhMoon, PhSun } from "@phosphor-icons/vue";
import { allColors, settingsNavItems } from "../lib/constants.ts";
import { Combobox, ComboboxAnchor, ComboboxGroup, ComboboxItem, ComboboxItemIndicator, ComboboxList, ComboboxTrigger } from "../components/ui/combobox";
import { Input } from "../components/ui/input";
import { FormControl, FormField, FormItem, FormLabel } from "../components/ui/form";
import { useColorMode } from "@vueuse/core";
import { useCustomize } from "../lib/useCustomize.ts";
import { ref, onMounted } from "vue";
import { cn } from "../lib/utils.ts";
import { useAuthStore } from "../stores/authStore.ts";
import type { Color, UserType } from "../lib/models.ts";

const { theme, radius, setTheme, setRadius } = useCustomize();
const RADII = [0, 0.25, 0.5, 0.75, 1];
const colorMode = useColorMode();
const activeTab = ref('Profile');

const formData = ref(null as UserType | null);

const backgroundColor = (color: Color) => {
  const bg = themes.find(theme => theme.name === color);
  return `hsl(${bg?.activeColor.light})`;
};

onMounted(() => {
  useAuthStore().getUser();
  formData.value = useAuthStore().user;
})
</script>
