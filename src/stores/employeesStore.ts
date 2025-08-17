import { ref } from "vue";
import { defineStore } from "pinia";
import employeesData from "../lib/data.json";
import type { UserType } from "../lib/models.ts";

export const useEmployeesStore = defineStore('employees', () => {
  const employees = ref([] as UserType[]);

  function getEmployees() {
    const res = localStorage.getItem("employees");
    if (!res) {
      restoreEmployees();
    } else {
      employees.value = JSON.parse(res).data;
    }
  }

  function restoreEmployees() {
    localStorage.setItem("employees", JSON.stringify(employeesData));
    employees.value = employeesData.data;
  }

  function deleteEmployees(id: string) {
    const i = employees.value.findIndex((e) => e.id === id);
    employees.value[i].status = "deleted";
  }

  function updateEmployee(employee: UserType) {
    const i = employees.value.findIndex((e) => e.id === employee.id);
    employees.value[i] = employee;
  }

  return { employees, getEmployees, restoreEmployees, deleteEmployees, updateEmployee };
})