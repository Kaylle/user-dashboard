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
              <DialogTitle>Edit user</DialogTitle>
              <DialogDescription>
                Make changes to the user here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form>
              <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="name">Full name</Label>
                  <Input
                    required
                    id="name"
                    v-model="popupData.fullName"
                    class="col-span-3"
                  />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="position">Position</Label>
                  <Input
                    required
                    id="position"
                    v-model="popupData.position"
                    class="col-span-3"
                  />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
  <!--                select-->
                  <Label for="status">Status</Label>
                  <Input
                    required
                    id="status"
                    v-model="popupData.status"
                    class="col-span-3"
                  />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="email">Email</Label>
                  <Input
                    required
                    type="email"
                    id="email"
                    v-model="popupData.email"
                    class="col-span-3"
                  />
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="phone">Phone</Label>
                  <Input
                    required
                    type="tel"
                    id="phone"
                    v-model="popupData.phone"
                    class="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  @click.prevent="save"
                  type="submit"
                >
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import BaseTable from "../components/basic-components/BaseTable.vue";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { ref, onMounted } from "vue";
import { toast } from "vue-sonner";
import type { FilterType, UserType } from "../lib/models.ts";
import { userColumns } from "../lib/constants.ts";
import StatisticSection from "../components/basic-components/StatisticSection.vue";
import { downloadTable } from "../lib/utils.ts";
import { PhCheckSquare, PhProhibitInset, PhTrash } from "@phosphor-icons/vue";
import { useEmployeesStore } from "../stores/employeesStore.ts";

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

const filters = ref([
  {
    name: 'status',
    values: [
      {
        val: false,
        name: "active",
        caption: useEmployeesStore().employees.filter(x=>x.status==='active').length.toString(),
        icon: PhCheckSquare
      },
      {
        val: false,
        name: "blocked",
        caption: useEmployeesStore().employees.filter(x=>x.status==='blocked').length.toString(),
        icon: PhProhibitInset
      },
      {
        val: false,
        name: "deleted",
        caption: useEmployeesStore().employees.filter(x=>x.status==='deleted').length.toString(),
        icon: PhTrash
      }
    ]
  }
] as FilterType[])

const downloadUserTable = () => {
  const columnsStr = userColumns.map((e) => e.label).join(";");
  const data = useEmployeesStore().employees.map(
    e => `${e.fullName};${e.position};${e.status};${e.email};${e.phone}`
  ).join("\n");
  downloadTable(columnsStr + "\n" + data);
}

const showPopup = (row: UserType) => {
  openPopup.value = true;
  popupData.value = row;
};

const save = () => {
  //validation
  useEmployeesStore().updateEmployee(popupData.value)
  toast('Successfully Saved!');
  openPopup.value = false;
}

const deleteEmployee = (id: string) => {
  useEmployeesStore().deleteEmployees(id);
  toast('Successfully Deleted!');
}

onMounted(() => {
  useEmployeesStore().getEmployees()
})
</script>
