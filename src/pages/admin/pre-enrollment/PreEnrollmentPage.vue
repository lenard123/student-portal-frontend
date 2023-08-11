<template>
  <div class="tw-p-8">
    <div class="tw-text-4xl tw-font-bold">Pre-Enrollment</div>
    <q-table
      class="tw-mt-8"
      :columns="columns"
      :loading="store.loading"
      :rows="enrollees"
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
            v-for="department in departments"
            :key="department.id"
          />
        </q-tabs>
      </template>
      <template v-slot:body-cell-status="{ value }">
        <q-td>
          {{ value }}
        </q-td>
      </template>
      <template v-slot:body-cell-action="{ row }">
        <q-td align="right">
          <q-btn
            :to="{ name: 'admin:pre-enrollment/info', params: { id: row.id } }"
            icon="visibility"
            flat
            round
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useAcademicYearStore } from "src/stores/academic-year";
import { useAppStore } from "src/stores/app";
import { useEnrollmentStore } from "src/stores/enrollment";
import { computed, onMounted, ref, watch } from "vue";

const appStore = useAppStore();
const academicYearStore = useAcademicYearStore();
const departments = computed(() => {
  return appStore.departments.filter(
    (department) => academicYearStore.activeAcademicYear[department.id] != null
  );
});
const department = ref(undefined);
const store = useEnrollmentStore();
const enrollees = computed(() =>
  store.getEnrollees(academicYearStore.activeAcademicYear[department.value]?.id)
);
const columns = [
  { name: "name", label: "Name", field: (row) => row.student.fullname },
  {
    name: "grade_level",
    label: "Grade Level",
    field: (row) => row.grade_level.name,
  },
  {
    name: "section",
    label: "Section",
    field: (row) => row.section?.name ?? "--",
  },
  { name: "status", label: "Status", field: "status" },
  { name: "action", label: "Action" },
];

watch(department, () => {
  if (department.value == undefined) return;
  store.fetchEnrollees(
    academicYearStore.activeAcademicYear[department.value].id
  );
});

onMounted(() => {
  department.value = departments.value[0]?.id;
});
</script>
