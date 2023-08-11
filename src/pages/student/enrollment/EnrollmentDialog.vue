<template>
  <q-dialog ref="dialogRef" square>
    <q-card class="tw-w-full tw-max-w-screen-lg">
      <q-form @submit="handleSubmit">
        <q-card-section class="tw-text-xl tw-font-bold">
          Registration Form
        </q-card-section>
        <q-stepper v-model="step" vertical>
          <q-step prefix="1" :name="1" title="Grade Level" :done="step > 1">
            <q-select
              :options="gradeLevels"
              :loading="gradeLevelsStore.loading"
              filled
              label="Select Grade Level"
              option-label="name"
              v-model="gradeLevel"
            />
            <q-stepper-navigation>
              <q-btn
                @click="getGradeLevel"
                color="primary"
                label="Next"
                :loading="gradeLevelStore.loading"
              />
            </q-stepper-navigation>
          </q-step>
          <q-step prefix="2" :name="2" title="Subjects" :done="step > 2">
            <q-list bordered>
              <q-item
                :key="subject.id"
                v-for="subject in gradeLevelStore.level.subjects"
              >
                <q-item-section>{{ subject.name }}</q-item-section></q-item
              >
            </q-list>

            <q-stepper-navigation>
              <q-btn color="gray" flat label="Previous" @click="step = 1" />
              <q-btn
                color="primary"
                label="Next"
                class="tw-ml-2"
                @click="step = 3"
              />
            </q-stepper-navigation>
          </q-step>
          <q-step prefix="3" :name="3" title="Fees">
            <q-list bordered>
              <q-item :key="fee.id" v-for="fee in gradeLevelStore.level.fees">
                <q-item-section>{{ fee.fee }}</q-item-section>
                <q-item-section side>
                  {{ numberFormat(fee.amount) }}
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item>
                <q-item-section class="tw-font-bold">Total</q-item-section>
                <q-item-section side class="tw-text-2xl tw-font-bold">
                  {{ numberFormat(gradeLevelStore.totalFees) }}
                </q-item-section>
              </q-item>
            </q-list>
            <q-stepper-navigation>
              <q-btn color="gray" flat label="Previous" @click="step = 2" />
              <q-btn
                color="primary"
                label="Enroll"
                class="tw-ml-2"
                type="submit"
              />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { Loading, useDialogPluginComponent } from "quasar";
import { useAuthStore } from "src/stores/auth";
import { useEnrollmentStore } from "src/stores/enrollment";
import { useGradeLevel } from "src/stores/grade-levels";
import { useGradeLevelsStore } from "src/stores/grade-levels";
import { Notify, numberFormat } from "src/utils";
import { computed, onMounted, ref } from "vue";

const step = ref(1);
const gradeLevel = ref(null);
const gradeLevelStore = computed(() => useGradeLevel(gradeLevel.value?.id));
const { dialogRef, onDialogOK } = useDialogPluginComponent();
const store = useEnrollmentStore();
const gradeLevelsStore = useGradeLevelsStore();
const authStore = useAuthStore();
const gradeLevels = computed(
  () => gradeLevelsStore.departmentGradeLevels[authStore.user.department]
);

const handleSubmit = async () => {
  try {
    Loading.show();
    await store.enroll(gradeLevel.value?.id);
    Notify.success("Registration submitted successfully");
    onDialogOK();
  } finally {
    Loading.hide();
  }
};

const getGradeLevel = () => {
  if (gradeLevel.value == null) return;
  gradeLevelStore.value.fetch().then(() => {
    step.value = 2;
  });
};

onMounted(() => {
  gradeLevelsStore.fetchAll();
});
</script>
