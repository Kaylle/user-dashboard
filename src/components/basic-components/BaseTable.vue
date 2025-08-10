<template>
  <div class="space-y-4">
    <TableFilters
      :columns="columns"
      :filters="filters"
      @update-text-filter="n=>textFilter=n.toString()"
      @update-column-visibility="updateColumnVisibility"
    />
    <div class="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              v-for="column in visibleColumns"
              :key="column.value"
            >
              <DropdownMenu v-if="column.sortable">
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost">
                    {{ column.label }}
                    <PhArrowUp v-if="column.sortMode===1" />
                    <PhArrowDown v-if="column.sortMode===2" />
                    <PhArrowsDownUp v-if="column.sortMode===0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    Sorting
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      :class="column.sortMode===1?'bg-gray-200':''"
                      @click="column.sortMode!==1?column.sortMode=1:column.sortMode=0"
                    >
                      <PhArrowUp/>
                      Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      :class="column.sortMode===2?'bg-gray-200':''"
                      @click="column.sortMode!==2?column.sortMode=2:column.sortMode=0"
                    >
                      <PhArrowDown/>
                      Dec
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" v-else>
                {{ column.label }}
              </Button>
            </TableHead>
            <TableHead v-if="actions"/>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="localData.length">
            <TableRow
              v-for="(row,i) in localData.slice(pageNumber*10, (pageNumber*10)+10)"
              :key="i"
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
              <TableCell class="pl-5" v-if="actions">
                <div class="flex items-center gap-2">
                  <Button
                    @click="rowClick(row)"
                    variant="outline"
                  >
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger as-child>
                      <Button variant="destructive">
                        <PhTrash />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete user
                          and remove data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction @click="onDelete">Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
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
    <TablePagination
      :rows="localData.length"
      :current-rows="localData.slice(pageNumber*10, (pageNumber*10)+10).length"
      :page-number="pageNumber"
      @update-page="(n:number)=>pageNumber=n"
    />
  </div>
</template>

<script setup lang="ts">
import { Table, TableHeader, TableRow, TableCell, TableHead, TableBody } from "../ui/table"
import {PhArrowDown, PhArrowsDownUp, PhArrowUp, PhTrash} from "@phosphor-icons/vue";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../components/ui/alert-dialog'
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem } from "../ui/dropdown-menu";
import { ref, computed, onMounted } from "vue";
import type {ColumnType, FilterType, FilterValueType} from "../../lib/models.ts";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import TableFilters from "../../components/basic-components/TableFilters.vue";
import TablePagination from "../../components/basic-components/TablePagination.vue";

const props = defineProps<{
  columns: ColumnType[];
  data: any;
  filters: FilterType[];
  actions?: boolean;
}>();

const visibleColumns = computed(() => localColumns.value.filter((x:ColumnType)=>!!x.isVisible));

const localData = computed(() => {
  let res = props.data;
  localColumns.value.forEach((column: ColumnType) => {
    if (column.sortMode && column.sortMode === 1)
      res.sort((a:any, b:any) => a[column.value].localeCompare(b[column.value]));
    if (column.sortMode && column.sortMode === 2)
      res.sort((a:any, b:any) => b[column.value].localeCompare(a[column.value]));
  });
  const needle = textFilter.value.toLowerCase();
  if (needle)
    res = props.data.filter((obj:any) =>
      Object.values(obj).some(v =>
        typeof v === 'string' && v.toLowerCase().includes(needle)
      )
    );
  props.filters.forEach((filter: FilterType) => {
    const activeValues = filter.values
      .filter((f: FilterValueType) => f.val)
      .map((f: FilterValueType) => f.name);
    if (activeValues.length === 0) return;
    res = res.filter((item: any) => activeValues.includes(item[filter.name]));
  });
  return res;
});

const pageNumber = ref(0);
const textFilter = ref('')
const localColumns = ref([] as ColumnType[]);

const emit = defineEmits([
  'rowClick',
  'updateFilters'
]);

const rowClick = (row: any): void => {
  emit("rowClick", row);
};

const onDelete = () => {
  console.log("onDelete");
}

const updateColumnVisibility = (column: ColumnType, val:boolean) => {
  localColumns.value.find(x=>x.value===column.value).isVisible = val;
}

onMounted(() => {
  localColumns.value = props.columns;
});
</script>