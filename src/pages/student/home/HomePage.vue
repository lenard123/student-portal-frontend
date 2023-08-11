<template>
  <div class="tw-p-8">
    <div class="tw-text-2xl tw-font-bold">Registration List</div>

    <q-table class="tw-mt-8" title="Registration Table" :columns="columns">
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
import { useQuasar } from "quasar";
import EnrollmentDialog from "../enrollment/EnrollmentDialog.vue";

const columns = [
  { name: "transaction_number", label: "Transaction No.#", align: "left" },
  { name: "grade_level", label: "Grade Level" },
  { name: "date", label: "Date" },
  { name: "status", label: "Status" },
  { name: "amount", label: "Total Amount" },
  { name: "actions", label: "Actions" },
];

const $q = useQuasar();
const enroll = () => {
  $q.dialog({
    component: EnrollmentDialog,
  });
};
</script>
