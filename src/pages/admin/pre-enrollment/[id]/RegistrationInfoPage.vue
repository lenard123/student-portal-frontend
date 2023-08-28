<template>
  <div class="tw-p-8">
    <div class="tw-text-4xl tw-font-bold">Registration Info</div>

    <q-card class="tw-mt-8">
      <q-card-section class="tw-text-xl tw-font-bold">
        Pre-Enrollment Info
      </q-card-section>
      <q-separator />
      <q-card-section class="tw-grid tw-grid-cols-4 tw-gap-4 tw-text-gray-600">
        <div>Transaction ID:</div>
        <div class="tw-col-span-3">
          {{ enrollee.transaction_id }}
        </div>

        <div>School Year:</div>
        <div class="tw-col-span-3">{{ enrollee.academic_year.name }}</div>

        <div>Department:</div>
        <div class="tw-col-span-3">{{ enrollee.student.department_label }}</div>

        <div>Grade Level:</div>
        <div class="tw-col-span-3">{{ enrollee.grade_level.name }}</div>

        <div>Date:</div>
        <div class="tw-col-span-3">
          {{ new Date(enrollee.created_at).toLocaleDateString() }}
        </div>

        <div>Status:</div>
        <div class="tw-col-span-3 tw-capitalize">{{ enrollee.status }}</div>
      </q-card-section>
    </q-card>

    <q-card class="tw-mt-8">
      <q-card-section class="tw-text-xl tw-font-bold">
        Student Info
      </q-card-section>
      <q-separator />
      <q-card-section class="tw-grid tw-grid-cols-4 tw-gap-4 tw-text-gray-600">
        <div>Fullname:</div>
        <div class="tw-col-span-3 tw-uppercase">
          {{ enrollee.student.fullname }}
        </div>

        <div>Gender:</div>
        <div class="tw-col-span-3">--</div>

        <div>Birthday:</div>
        <div class="tw-col-span-3">--</div>

        <div>Birthplace:</div>
        <div class="tw-col-span-3">--</div>

        <div>Civil Status:</div>
        <div class="tw-col-span-3">--</div>

        <div>Religion:</div>
        <div class="tw-col-span-3">--</div>

        <div>Nationality:</div>
        <div class="tw-col-span-3">--</div>
      </q-card-section>
    </q-card>

    <q-card class="tw-mt-8">
      <q-card-section class="tw-text-xl tw-font-bold">
        Subjects
      </q-card-section>
      <q-separator />
      <q-table
        :columns="subjectColumns"
        :rows="enrollee.grade_level.subjects"
      />
    </q-card>

    <q-card class="tw-mt-8">
      <q-card-section class="tw-text-xl tw-font-bold"> Fees </q-card-section>
      <q-separator />
      <q-table :columns="feesColumns" :rows="enrollee.grade_level.fees" />
    </q-card>

    <div class="tw-flex justify-end tw-mt-8 tw-gap-4">
      <q-btn
        label="Reject"
        color="orange"
        v-if="enrollee.status == 'pending'"
      />
      <q-btn
        label="Enroll"
        color="primary"
        @click="enroll"
        v-if="enrollee.status == 'pending'"
      />
    </div>
  </div>
</template>
<script>
import { LoadingBar } from "quasar";
import { api } from "src/boot/axios";
import useDialog from "src/composables/useDialog";
import { useEnrollee } from "src/stores/enrollment";
import { numberFormat } from "src/utils";
import { useRoute } from "vue-router";
import EnrollDialog from "./components/EnrollDialog.vue";
import { computed } from "vue";

export default {
  setup() {
    const route = useRoute();
    const store = useEnrollee(route.params.id);

    const subjectColumns = [
      { name: "name", label: "Subject", align: "left", field: "name" },
    ];

    const feesColumns = [
      { name: "name", label: "Fees", align: "left", field: "fee" },
      {
        name: "amount",
        label: "Amount",
        align: "left",
        field: "amount",
        format: (val) => numberFormat(val),
      },
    ];

    const { dialog } = useDialog();

    const enroll = () => {
      dialog({
        component: EnrollDialog,
        componentProps: {
          enrollee_id: route.params.id,
        },
      });
    };

    return {
      enrollee: computed(() => store.enrollee),
      subjectColumns,
      feesColumns,
      enroll,
    };
  },
  async beforeRouteEnter(to) {
    LoadingBar.start();
    const store = useEnrollee(to.params.id);
    try {
      if (store.enrollee == null) await store.fetch();
    } finally {
      LoadingBar.stop();
    }
  },
};
</script>
