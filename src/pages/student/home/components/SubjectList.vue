<template>
  <div class="tw-p-8">
    <div class="tw-text-2xl tw-font-bold">Subject List</div>
    <div class="tw-flex tw-gap-4 tw-mt-8">
      <SubjectCard v-for="schedule in schedules" :key="schedule.id" to="student:schedules/info" :schedule="schedule" />
    </div>
  </div>
</template>

<script setup>
import { LoadingBar } from "quasar";
import SubjectCard from "src/pages/components/SubjectCard.vue";
import { useStudentsStore } from "src/stores/student";
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
