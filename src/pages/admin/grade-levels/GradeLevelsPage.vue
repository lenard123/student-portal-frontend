<template>
  <app-page-container>
    <div class="tw-text-4xl tw-font-bold">Grade Levels</div>
    <q-table
      class="tw-mt-8"
      :columns="columns"
      :loading="store.loading"
      :rows="rows"
    >
      <template v-slot:top>
        <q-tabs
          v-model="department"
          class="-tw-m-3 tw-text-gray-500"
          active-class="tw-text-gray-700"
        >
          <q-tab
            :name="department.id"
            :label="department.value"
            v-for="department in appStore.departments"
            :key="department.id"
          />
        </q-tabs>
      </template>
      <template v-slot:body-cell-action="{ row }">
        <q-td align="right">
          <q-btn
            label="Manage Curriculum"
            v-if="academicYearStore.activeAcademicYear[department] != null"
            flat
            :to="{
              name: 'admin:grade-levels/curriculum',
              params: { id: row.id },
            }"
          />
        </q-td>
      </template>
    </q-table>
  </app-page-container>
</template>

<script setup>
import { useAcademicYearStore } from "src/stores/academic-year";
import { useAppStore } from "src/stores/app";
import { useGradeLevelsStore } from "src/stores/grade-levels";
import { computed, onMounted, ref } from "vue";

const appStore = useAppStore();
const academicYearStore = useAcademicYearStore();
const store = useGradeLevelsStore();
const department = ref(appStore.departments[0].id);
const columns = [
  { name: "name", label: "Grade Level", align: "left", field: "name" },
  { name: "action", label: "Action" },
];
const rows = computed(() => {
  return store.departmentGradeLevels[department.value];
});
onMounted(() => {
  store.fetchAll();
});
</script>
