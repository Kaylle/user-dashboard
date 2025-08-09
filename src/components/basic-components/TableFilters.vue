<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center gap-2 flex-wrap">
      <Input
        placeholder="Find by text..."
        class="h-8 w-[150px] lg:w-[250px]"
        v-model="textFilter"
        @update:model-value="n=>updateTextFilter(n.toString())"
      />
      <DropdownMenu
        v-for="filter in filters"
        :key="filter.name"
      >
        <DropdownMenuTrigger as-child>
          <Button
            class="h-8 px-2 lg:px-3"
            variant="outline"
          >
            <PhPlusCircle/>
            {{ filter.name }}
            <Badge
              v-for="badge in filter.values.filter((x:FilterValueType)=>x.val)"
              :key="badge.name"
              variant="secondary"
              class="rounded-sm px-1 font-normal"
            >
              {{ badge.name }}
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
          <DropdownMenuGroup>
            <DropdownMenuCheckboxItem
              v-for="item in filter.values"
              :key="item.name"
              @click="item.val = !item.val"
              :model-value="item.val"
            >
              <component :is="item.icon" />
              <span>{{ item.name }}</span>
              <span class="ml-auto">{{ item.caption }}</span>
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        v-if="isFiltered"
        variant="outline"
        class="h-8 px-2 lg:px-3"
        @click="resetFilters"
      >
        Reset
        <PhX class="ml-2 h-4 w-4" />
      </Button>
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button
          variant="outline"
          size="sm"
          class="ml-auto hidden h-8 lg:flex"
        >
          <PhFadersHorizontal class="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        class="w-[150px]"
      >
        <DropdownMenuLabel>
          Toggle columns
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          v-for="column in columns"
          :key="column.value"
          :model-value="column.isVisible"
          @update:model-value="(n: boolean) => updateColumnVisibility(column, n)"
        >
          {{ column.label }}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<script setup lang="ts">
import { PhFadersHorizontal, PhPlusCircle, PhX} from "@phosphor-icons/vue";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuCheckboxItem, DropdownMenuSeparator, DropdownMenuGroup } from "../ui/dropdown-menu";
import { ref, computed } from "vue";
import type {ColumnType, FilterType, FilterValueType} from "../../lib/models.ts";
import { Badge } from "../../components/ui/badge";

const props = defineProps<{
  columns: ColumnType[],
  filters: FilterType[]
}>();

const isFiltered = computed(() =>
  textFilter.value || props.filters.filter((x) => x.values.find(x=>x.val)).length
);

const textFilter = ref('' as string);

const emit = defineEmits([
  'updateTextFilter',
  'updateColumnVisibility'
]);

const resetFilters = () => {
  textFilter.value = '';
  updateTextFilter('')
  props.filters.forEach((filter:FilterType) => {
    filter.values.forEach((f:FilterValueType) => {
      f.val = false;
    })
  });
};

const updateTextFilter = (val:string) => {
  emit('updateTextFilter', val);
};

const updateColumnVisibility = (column:ColumnType, val:boolean) => {
  emit("updateColumnVisibility", column, val);
};
</script>