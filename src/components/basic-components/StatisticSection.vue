<template>
  <div class="grid gap-4 lg:grid-cols-4 md:grid-cols-2 md:gap-8">
    <Card>
      <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle class="text-sm font-medium">
          Total Users
        </CardTitle>
        <PhUsers class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          {{ dataCard.totalUsers }}
        </div>
        <p class="text-xs text-muted-foreground">
          total users in the system
        </p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle class="text-sm font-medium">
          Active
        </CardTitle>
        <PhCheckSquare class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          {{ dataCard.activeUsers }}
        </div>
        <p class="text-xs text-muted-foreground">
          users which have access to the system
        </p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle class="text-sm font-medium">
          Blocked
        </CardTitle>
        <PhProhibitInset class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          {{ dataCard.blockedUsers }}
        </div>
        <p class="text-xs text-muted-foreground">
          users without access, but can be unblocked
        </p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle class="text-sm font-medium">
          Deleted
        </CardTitle>
        <PhTrash class="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">
          {{ dataCard.deletedUsers }}
        </div>
        <p class="text-xs text-muted-foreground">
          users which have been deleted
        </p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { PhCheckSquare, PhProhibitInset, PhTrash, PhUsers } from "@phosphor-icons/vue";
import { computed } from "vue";
import type { UserType } from "@/lib/models.ts";

const dataCard = computed(() => {
  return {
    totalUsers: props.employees.length,
    activeUsers: props.employees.filter(x => x.status === 'active').length,
    blockedUsers: props.employees.filter(x => x.status === 'blocked').length,
    deletedUsers: props.employees.filter(x => x.status === 'deleted').length
  };
});

const props = defineProps<{
  employees: UserType[]
}>();
</script>
