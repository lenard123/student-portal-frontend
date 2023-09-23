<template>
  <app-page-container>
    <div class="tw-text-4xl tw-font-bold">Pre-Enrollment</div>

    <q-btn
      class="tw-mt-8"
      label="Track Registration"
      color="primary"
      icon="search"
      @click="trackRegistration"
    />

    <q-table
      class="tw-mt-4"
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
          <q-btn @click="print(row.id)" icon="print" flat />
          <q-btn
            :to="{ name: 'admin:pre-enrollment/info', params: { id: row.id } }"
            icon="visibility"
            flat
            round
          />
        </q-td>
      </template>
    </q-table>
  </app-page-container>
</template>

<script setup>
import { Loading } from "quasar";
import { api } from "src/boot/axios";
import useDialog from "src/composables/useDialog";
import { useAcademicYearStore } from "src/stores/academic-year";
import { useAppStore } from "src/stores/app";
import { useEnrollmentStore } from "src/stores/enrollment";
import { computed, onMounted, ref, watch } from "vue";
import TrackRegistrationDialog from "./TrackRegistrationDialog.vue";

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
  {
    name: "transaction_id",
    label: "Transaction ID",
    field: (row) => row.transaction_id,
  },
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
const { dialog } = useDialog();
const trackRegistration = () => {
  dialog({
    component: TrackRegistrationDialog,
  });
};

const print = (id) => {
  // window.location.href = `${api.defaults.baseURL}/enrollment/${id}/download`;
  Loading.show();
  api
    .get(`/enrollment/${id}/download`, {
      responseType: "blob",
    })
    .then((response) => {
      const href = URL.createObjectURL(response.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "registration.pdf"); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    })
    .finally(() => {
      Loading.hide();
    });
};

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
