<template>
  <Pagination
    v-slot="{ page }"
    :items-per-page="10"
    :total="rows"
    :default-page="1"
    class="items-center"
  >
    <div class="text-sm text-muted-foreground mr-auto">
      {{currentRows}}
      of {{ rows }} row(s).
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
          @click="$emit('update-page', item.value-1)"
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
</template>

<script setup lang="ts">
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationNext, PaginationPrevious } from "../ui/pagination";

defineProps<{
  rows: any,
  pageNumber: number,
  currentRows: number
}>();
</script>