<template>
  <div class="tw-p-8" v-if="store.initialize">
    <div class="tw-text-4xl tw-font-bold">Manage Curriculum</div>
    <div class="tw-mt-8 tw-grid tw-grid-cols-3 tw-gap-4 tw-items-start">
      <q-card>
        <q-card-section class="tw-font-bold tw-text-xl">
          {{ level.name }}
        </q-card-section>
        <q-separator />
        <q-card-section class="tw-flex tw-flex-col tw-text-lg">
          <div class="tw-flex tw-justify-between">
            <span class="tw-text-base">Total Subjects:</span>
            <spa class="tw-text-gray-500 tw-font-bold">
              {{ store.level.subjects.length }}
            </spa>
          </div>
          <div
            class="tw-flex tw-justify-between tw-mt-2"
            v-for="fee in store.level.fees"
            :key="fee.id"
          >
            <span class="tw-text-base">{{ fee.fee }}:</span>
            <spa class="tw-text-gray-500 tw-font-bold">{{ fee.amount }}</spa>
          </div>
          <q-separator />
          <div class="tw-flex tw-justify-between">
            <span class="tw-text-base">Total Amount:</span>
            <spa class="tw-text-gray-500 tw-font-bold">
              {{ store.level.fees.reduce((acm, fee) => acm + fee.amount, 0) }}
            </spa>
          </div>
        </q-card-section>
      </q-card>
      <q-card class="tw-col-span-2">
        <q-tabs
          v-model="tab"
          class="tw-text-gray-500 tw-w-full"
          active-class="tw-text-gray-700"
          align="left"
        >
          <q-tab name="subject" label="Subjects" />
          <q-tab name="fees" label="Fees" />
        </q-tabs>
        <q-separator />
        <SubjectTab v-if="tab == 'subject'" :grade-level="store.level" />
        <FeesTab v-if="tab == 'fees'" :grade-level="store.level" />
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { LoadingBar } from "quasar";
import { useGradeLevel } from "src/stores/grade-levels";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import SubjectTab from "./SubjectTab.vue";
import FeesTab from "./FeesTab.vue";

const route = useRoute();
const store = useGradeLevel(route.params.id);
const level = computed(() => store.level);
const tab = ref("subject");

onMounted(() => {
  LoadingBar.start();
  store.fetch().finally(() => LoadingBar.stop());
});
</script>
