<template>
  <app-page-container>
    <div class="tw-text-4xl tw-font-bold">Manage School Year</div>
    <div class="tw-mt-8">
      <q-btn
        @click="addSchoolYear"
        rounded
        color="primary"
        label="Add New School Year"
        icon="add"
      />
    </div>
    <q-table
      class="tw-mt-4"
      :rows="rows"
      :columns="columns"
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
            v-for="department in appStore.departments"
            :key="department.id"
          />
        </q-tabs>
      </template>
      <template v-slot:body-cell-status="{ row }">
        <q-td auto-width>
          <q-chip v-if="row.status == 'preparation'" label="Preparation" />
        </q-td>
      </template>
      <template v-slot:body-cell-action="{ row }">
        <q-td auto-width>
          <q-btn
            v-if="row.status == 'preparation'"
            label="Start Enrollment"
            unelevated
            color="green"
            @click="startEnrollment(row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </app-page-container>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useAcademicYearStore } from "src/stores/academic-year";
import { useAppStore } from "src/stores/app";
import { computed, onMounted, ref } from "vue";
import AddSchoolYear from "./components/AddSchoolYear.vue";
import { useConfirmDialog } from "src/composables/useDialog";

const appStore = useAppStore();
const department = ref(appStore.departments[0].id);
const store = useAcademicYearStore();
const rows = computed(() => store.departmentAcadamicYears[department.value]);
const columns = [
  { name: "name", label: "School Year", field: "name", align: "left" },
  { name: "status", label: "Status" },
  { name: "action", label: "Action" },
];
const $q = useQuasar();
const { dialog } = useConfirmDialog();
const addSchoolYear = () => {
  $q.dialog({
    component: AddSchoolYear,
  });
};

const startEnrollment = (academic_year_id) => {
  dialog({
    message: "Are you sure to start enrollment in this school year?",
    async onSubmit() {
      await store.startEnrollment(academic_year_id);
    },
  });
};

onMounted(() => {
  store.fetchAll();
});
</script>
