<template>
  <div class="tw-p-8">
    <div class="tw-text-2xl tw-font-bold">Registration List</div>

    <q-table
      :rows="store.registrations"
      :loading="loading"
      class="tw-mt-8"
      title="Registration Table"
      :columns="columns"
    >
      <template v-slot:top-right>
        <q-btn
          label="Enroll Now"
          color="primary"
          class="tw-ml-auto"
          unelevated
          @click="enroll"
        />
      </template>
    </q-table>
  </div>
</template>

<script setup>
import moment from "moment";
import { useQuasar } from "quasar";
import EnrollmentDialog from "src/pages/student/enrollment/EnrollmentDialog.vue";
import { useEnrollmentStore } from "src/stores/enrollment";
import { onMounted, ref } from "vue";
// import EnrollmentDialog from "../../enrollment/EnrollmentDialog.vue";

const columns = [
  {
    name: "transaction_id",
    label: "Transaction No.#",
    align: "left",
    field: "transaction_id",
  },
  {
    name: "grade_level",
    label: "Grade Level",
    field: (row) => row.grade_level.name,
  },
  {
    name: "date",
    label: "Date",
    field: (row) => moment(row.created_at).fromNow(),
  },
  { name: "status", label: "Status", field: "status" },
  { name: "actions", label: "Actions" },
];

const $q = useQuasar();
const store = useEnrollmentStore();
const loading = ref(false);

const enroll = () => {
  $q.dialog({
    component: EnrollmentDialog,
  });
};

onMounted(() => {
  loading.value = true;
  store.fetchRegistrations().finally(() => {
    loading.value = false;
  });
});
</script>
