<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div class="flex flex-1 items-center gap-2 flex-wrap">
        <Input
          placeholder="Find by text..."
          class="h-8 w-[150px] lg:w-[250px]"
          v-model="filter"
        />
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              class="h-8 px-2 lg:px-3"
              variant="outline"
            >
              <PhPlusCircle/>
              Status
              <Badge
                v-if="!!selectedStatuses.active"
                variant="secondary"
                class="rounded-sm px-1 font-normal"
              >
                Active
              </Badge>
              <Badge
                v-if="!!selectedStatuses.blocked"
                variant="secondary"
                class="rounded-sm px-1 font-normal"
              >
                Blocked
              </Badge>
              <Badge
                v-if="!!selectedStatuses.deleted"
                variant="secondary"
                class="rounded-sm px-1 font-normal"
              >
                Deleted
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56">
            <DropdownMenuGroup>
              <DropdownMenuCheckboxItem
                @click="selectedStatuses.active=!selectedStatuses.active"
                :model-value="selectedStatuses.active"
              >
                <PhCheckSquare />
                <span>Active</span>
                <span class="ml-auto">
                  {{data.activeUsers}}
                </span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                @click="selectedStatuses.blocked=!selectedStatuses.blocked"
                :model-value="selectedStatuses.blocked"
              >
                <PhProhibitInset />
                <span>Blocked</span>
                <span class="ml-auto">
                  {{data.blockedUsers}}
                </span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                @click="selectedStatuses.deleted=!selectedStatuses.deleted"
                :model-value="selectedStatuses.deleted"
              >
                <PhTrash />
                <span>Deleted</span>
                <span class="ml-auto">
                  {{data.deletedUsers}}
                </span>
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <slot/>
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
            v-for="column in localColumns"
            :key="column.value"
            :model-value="column.isVisible"
            @update:model-value="(value: boolean) => column.isVisible = value"
          >
            {{ column.label }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              v-for="column in visibleColumns"
              :key="column.value"
            >
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost">
                    {{ column.label }}
                    <PhArrowUp/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    Sorting
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <PhArrowUp/>
                      Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <PhArrowDown/>
                      Dec
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableHead>
            <TableHead/>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="localData.length">
            <TableRow
              v-for="(row,i) in localData.slice(pageNumber*10, (pageNumber*10)+10)"
              :key="i"
              @click="rowClick(row)"
            >
              <TableCell
                class="pl-5"
                v-for="cell in visibleColumns"
                :key="cell.value"
              >
                <span v-if="cell.type === 'string'">
                  {{ row[cell.value] }}
                </span>
                <Badge v-if="cell.type === 'tag'">
                  {{ row[cell.value] }}
                </Badge>
                <div
                  class="flex items-center gap-2"
                  v-if="cell.type === 'avatar'"
                >
                  <Avatar class="h-8 w-8 rounded-lg">
                    <AvatarImage
                      :src="row.avatar"
                      alt="avatar"
                    />
                    <AvatarFallback>
                      {{ row[cell.value].split(' ').map((n:string) => n[0]).join('') }}
                    </AvatarFallback>
                  </Avatar>
                  <span class="font-semibold">
                    {{ row[cell.value] }}
                  </span>
                </div>
                <a
                  class="underline"
                  v-if="cell.type === 'email'"
                  :href="`mailto:${row[cell.value]}`"
                  target="_blank"
                >
                  {{ row[cell.value] }}
                </a>
                <a
                  class="underline"
                  v-if="cell.type === 'phone'"
                  :href="`tel:${row[cell.value]}`"
                  target="_blank"
                >
                  {{ row[cell.value] }}
                </a>
              </TableCell>
              <TableCell class="pl-5">
                <Button
                  @click.self="onDelete"
                  variant="destructive"
                >
                  <PhTrash />
                </Button>
              </TableCell>
            </TableRow>
          </template>
          <TableRow v-else>
            <TableCell
              :colspan="columns.length"
              class="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <Pagination
      v-slot="{ page }"
      :items-per-page="10"
      :total="localData.length"
      :default-page="1"
      class="items-center"
    >
      <div class="text-sm text-muted-foreground mr-auto">
        {{localData.slice(pageNumber*10, (pageNumber*10)+10).length}}
        of {{ localData.length }} row(s).
      </div>
      <PaginationContent v-slot="{ items }">
        <PaginationPrevious />
        <PaginationEllipsis
          v-if="pageNumber>3"
          :index="4"
        />
        <template
          v-for="(item, index) in items"
          :key="index"
        >
          <PaginationItem
            @click="pageNumber=item.value-1"
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === page"
          >
            {{ item.value }}
          </PaginationItem>
        </template>
        <PaginationEllipsis
          v-if="pageNumber<4"
          :index="4"
        />
        <PaginationNext />
      </PaginationContent>
    </Pagination>
  </div>
</template>

<script setup lang="ts">
import { Table, TableHeader, TableRow, TableCell, TableHead, TableBody } from "../ui/table"
import {
  PhArrowDown,
  PhArrowUp,
  PhCheckSquare,
  PhFadersHorizontal,
  PhPlusCircle,
  PhProhibitInset,
  PhTrash,
  PhX
} from "@phosphor-icons/vue";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuCheckboxItem, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "../ui/dropdown-menu";
import { ref, computed, onMounted } from "vue";
import type { ColumnType } from "../../lib/models.ts";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import users from "../../lib/data.json";

const props = defineProps<{
  columns: ColumnType[]
  data: any
}>();

const isFiltered = computed(() =>
  filter.value || !(!selectedStatuses.value.active && !selectedStatuses.value.blocked && !selectedStatuses.value.deleted)
);

const visibleColumns = computed(() => localColumns.value.filter((x:ColumnType)=>!!x.isVisible));

const localData = computed(() =>{
  const needle = filter.value.toLowerCase();
  let res = props.data;
  if (needle)
    res = props.data.filter((obj:any) =>
      Object.values(obj).some(v =>
        typeof v === 'string' && v.toLowerCase().includes(needle)
      )
    );
  if (!(!selectedStatuses.value.active&&!selectedStatuses.value.blocked&&!selectedStatuses.value.deleted))
    res = res.filter((obj:any) =>
      (selectedStatuses.value.active && obj.status === 'active') ||
      (selectedStatuses.value.blocked && obj.status === 'blocked') ||
      (selectedStatuses.value.deleted && obj.status === 'deleted')
    );
  return res;
})

const pageNumber = ref(0);
const localColumns = ref([] as ColumnType[]);
const filter = ref('' as string);
const selectedStatuses = ref({
  active: false,
  blocked: false,
  deleted: false
});

const emit = defineEmits([
  'rowClick'
]);

const data = {
  activeUsers: users.data.filter(x=>x.status==='active').length,
  blockedUsers: users.data.filter(x=>x.status==='blocked').length,
  deletedUsers: users.data.filter(x=>x.status==='deleted').length
}

const rowClick = (row: any): void => {
  emit("rowClick", row);
};

const onDelete = () => {
  console.log("onDelete");
}

const resetFilters = () => {
  selectedStatuses.value = {
    active: false,
    blocked: false,
    deleted: false
  };
  filter.value = '';
};

onMounted(() => {
  localColumns.value = props.columns;
});
</script>