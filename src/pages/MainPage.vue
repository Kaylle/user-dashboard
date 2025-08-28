<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h2 class="text-2xl font-bold tracking-tight">
        Dashboard
      </h2>
    </div>
    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <StatisticSection
        :employees="useEmployeesStore().employees"
      />
      <div class="w-full flex flex-col items-stretch gap-4">
        <div class="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 class="text-2xl font-bold tracking-tight">
              Users list
            </h2>
            <p class="text-muted-foreground">
              Here`s a list of users in a system!
            </p>
          </div>
          <div class="flex items-center space-x-2">
            <Button @click="downloadUserTable">
              Download in .csv
            </Button>
          </div>
        </div>
        <BaseTable
          actions
          :data="useEmployeesStore().employees"
          :columns="userColumns"
          @row-click="showPopup"
          @on-delete="deleteEmployee"
          :filters="filters"
        />
        <Dialog v-model:open="openPopup">
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                Edit user
              </DialogTitle>
              <DialogDescription>
                Make changes to the user here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <UserForm
              @save="save"
              :data="popupData"
            />
          </DialogContent>
        </Dialog>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { toast } from "vue-sonner";
import { userColumns } from "../lib/constants.ts";
import { PhCheckSquare, PhProhibitInset, PhTrash } from "@phosphor-icons/vue";
import { ref, onMounted } from "vue";
import { downloadTable } from "../lib/utils.ts";
import { useEmployeesStore } from "../stores/employeesStore.ts";
import BaseTable from "../components/basic-components/BaseTable.vue";
import StatisticSection from "../components/basic-components/StatisticSection.vue";
import type { FilterType, UserType } from "../lib/models.ts";
import UserForm from "../components/basic-components/UserForm.vue";

const openPopup = ref(false);

const popupData = ref({
  id: '',
  fullName: '',
  status: '',
  position: '',
  email: '',
  avatar: '',
  phone: ''
} as UserType);

const filters = ref([] as FilterType[]);

const downloadUserTable = () => {
  const columnsStr = userColumns.map((e) => e.label).join(";");
  const data = useEmployeesStore().employees.map(
    e => `${e.fullName};${e.position};${e.status};${e.email};${e.phone}`
  ).join("\n");
  downloadTable(columnsStr + "\n" + data);
};

const showPopup = (row: UserType) => {
  openPopup.value = true;
  popupData.value = row;
};

const save = (data: UserType) => {
  useEmployeesStore().updateEmployee(data);
  toast('Successfully Saved!');
  openPopup.value = false;
};

const deleteEmployee = (id: string) => {
  useEmployeesStore().deleteEmployees(id);
  toast('Successfully Deleted!');
};

onMounted(() => {
  useEmployeesStore().getEmployees();
  filters.value = [{
    name: 'status',
    values: [
      {
        val: false,
        name: "active",
        caption: useEmployeesStore().employees.filter(x => x.status === 'active').length.toString(),
        icon: PhCheckSquare
      },
      {
        val: false,
        name: "blocked",
        caption: useEmployeesStore().employees.filter(x => x.status === 'blocked').length.toString(),
        icon: PhProhibitInset
      },
      {
        val: false,
        name: "deleted",
        caption: useEmployeesStore().employees.filter(x => x.status === 'deleted').length.toString(),
        icon: PhTrash
      }
    ]
  }]
});
</script>
