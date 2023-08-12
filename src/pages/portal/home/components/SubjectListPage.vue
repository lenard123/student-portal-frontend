<template>
  <div class="tw-p-8">
    <div class="tw-text-2xl tw-font-bold">Subject List</div>
    <div class="tw-flex tw-gap-4 tw-mt-8">
      <SubjectCard
        v-for="schedule in schedules"
        :key="schedule.id"
        to="portal:subjects/overview"
        :schedule="schedule"
      />
    </div>
  </div>
</template>

<script setup>
import { LoadingBar } from "quasar";
import SubjectCard from "src/pages/components/SubjectCard.vue";
import { useSchedulesStore } from "src/stores/schedule";
import { computed, onBeforeMount, onMounted } from "vue";

const store = useSchedulesStore();
const schedules = computed(() => store.schedules);

onBeforeMount(async () => {
  if (store.schedules == null) {
    try {
      LoadingBar.start();
      await store.fetchAll();
    } finally {
      LoadingBar.stop();
    }
  }
});

onMounted(() => {
  store.fetchAll();
});
</script>
