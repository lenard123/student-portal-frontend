<template>
  <div class="tw-p-8">
    <div class="tw-text-2xl tw-font-bold">Subject List</div>
    <div class="tw-flex tw-gap-4 tw-mt-8">
      <q-card
        class="tw-w-full tw-max-w-[300px]"
        v-for="schedule in schedules"
        :key="schedule.id"
      >
        <q-card-section
          class="tw-text-white"
          :class="getBackgroundColor(schedule.id)"
        >
          <div class="tw-text-xl tw-capitalize">
            {{ schedule.subject.name }}
          </div>
          <div class="tw-mt-4">
            <q-chip color="transparent" text-color="white">
              <q-avatar>
                <img :src="schedule.faculty.avatar" />
              </q-avatar>
              {{ schedule.faculty.fullname }}
            </q-chip>
          </div>
          <div
            class="tw-bg-white/50 tw-mt-4 tw-p-2 tw-rounded tw-flex tw-flex-col tw-gap-2"
          >
            <div class="tw-flex tw-gap-2 tw-items-end">
              <span class="tw-font-bold tw-text-lg tw-leading-5">0</span>
              <span>Lesson</span>
            </div>
            <div class="tw-flex tw-gap-2 tw-items-end">
              <span class="tw-font-bold tw-text-lg tw-leading-5">0</span>
              <span>Assignments</span>
            </div>
            <div class="tw-flex tw-justify-end">
              <q-btn
                :to="{
                  name: 'student:schedules/info',
                  params: { id: schedule.id },
                }"
                icon="folder"
                size="sm"
                unelevated
                label="View"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { LoadingBar } from "quasar";
import { useStudentsStore } from "src/stores/student";
import { getBackgroundColor } from "src/utils";
import { computed, onBeforeMount } from "vue";

const store = useStudentsStore();
const schedules = computed(() => store.subjects);

onBeforeMount(async () => {
  try {
    LoadingBar.start();
    await store.fetchSubjects();
  } finally {
    LoadingBar.stop();
  }
});
</script>
