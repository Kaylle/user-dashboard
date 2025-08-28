<template>
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
      type="button"
      @click="onSave"
    >
      Save changes
    </Button>
  </form>
</template>

<script setup lang="ts">
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { PhCaretUpDown, PhCheck } from "@phosphor-icons/vue";
import { Combobox, ComboboxAnchor, ComboboxGroup, ComboboxItem, ComboboxItemIndicator, ComboboxList, ComboboxTrigger } from "../../components/ui/combobox";
import { Input } from "../../components/ui/input";
import { FormControl, FormField, FormItem, FormLabel } from "../../components/ui/form";
import { ref, onMounted } from "vue";
import { cn } from "@/lib/utils.ts";
import type { UserType } from "@/lib/models.ts";
import { toast } from "vue-sonner";

const formData = ref(null as UserType | null);

const props = defineProps<{
  data: UserType | null;
}>();

const emit = defineEmits([
  'save'
]);

const onSave = () => {
  let message = '';
  if (!formData.value?.email || !formData.value.fullName)
    message = 'Fields "Email" and "Name" are required';
  if (message)
    return toast.error('Error!', {
      description: message
    });
  emit("save", formData.value);
};

onMounted(() => {
  if (props.data) formData.value = {...props.data};
});
</script>
