<template>
  <div class="tw-p-8">
    <div class="tw-text-4xl tw-font-bold">Sections</div>
    <div class="tw-mt-8">
      <q-btn
        @click="addSection"
        rounded
        color="primary"
        label="Add Section"
        icon="add"
      />
    </div>
    <q-table
      class="tw-mt-4"
      :columns="columns"
      :rows="store.sections"
      :loading="store.loading"
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
            v-for="department in academicYearStore.activeDepartmentOptions"
            :key="department.id"
          />
        </q-tabs>
      </template>
      <template v-slot:body-cell-action="{ row }">
        <q-td align="right">
          <q-btn
            :to="{ name: 'admin:sections/info', params: { id: row.id } }"
            icon="visibility"
            round
            flat
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useAcademicYearStore } from "src/stores/academic-year";
import { useAppStore } from "src/stores/app";
import { useSections } from "src/stores/sections";
import { computed, onMounted, ref, watch } from "vue";
import AddSectionDialog from "./AddSectionDialog.vue";

const appStore = useAppStore();
const department = ref();
const $q = useQuasar();
const academicYearStore = useAcademicYearStore();
const academicYearId = computed(
  () => academicYearStore.activeAcademicYear[department.value]?.id
);
const store = computed(() => useSections(academicYearId.value));

const columns = [
  { name: "name", label: "Section", align: "left", field: "name" },
  {
    name: "grade_level",
    label: "Grade Level",
    field: (row) => row.grade_level.name,
  },
  { name: "action", label: "Actions" },
];

watch(department, () => {
  store.value.fetch();
});

onMounted(() => {
  department.value = appStore.departments[0].id;
});

const addSection = () => {
  $q.dialog({
    component: AddSectionDialog,
    componentProps: {
      department: department.value,
      academicYearId: academicYearId.value,
    },
  });
};
</script>
