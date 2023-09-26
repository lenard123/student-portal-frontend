<template>
  <app-page-container>
    <div
      class="tw-text-white tw-p-4 tw-rounded"
      :class="getBackgroundColor(schedule.id)"
    >
      <div class="tw-text-4xl">{{ schedule.subject.name }}</div>
      <div class="tw-text-xl tw-mt-2">
        Teacher:
        <span class="tw-font-bold">{{ schedule.faculty.fullname }}</span>
      </div>
      <div class="tw-text-xl tw-mt-1">
        Section: <span class="tw-font-bold">{{ schedule.section.name }}</span>
      </div>
    </div>
    <div
      class="tw-mt-4 tw-flex tw-flex-col lg:tw-flex-row tw-gap-4 tw-items-start"
    >
      <q-card class="tw-flex-shrink-0 tw-w-full lg:tw-w-auto">
        <q-list class="tw-min-w-[270px]">
          <q-item-label header>Menu</q-item-label>
          <q-item :to="{ name: 'portal:subjects/overview' }" clickable exact>
            <q-item-section avatar>
              <q-icon name="visibility" />
            </q-item-section>
            <q-item-section>Overview</q-item-section>
          </q-item>
          <q-item clickable :to="{ name: 'portal:subjects/students' }">
            <q-item-section avatar>
              <q-icon name="people" />
            </q-item-section>
            <q-item-section>Students</q-item-section>
          </q-item>
          <q-item :to="{ name: 'portal:subjects/lessons' }" clickable>
            <q-item-section avatar>
              <q-icon name="assignment" />
            </q-item-section>
            <q-item-section>Lessons</q-item-section>
          </q-item>
          <q-item :to="{ name: 'portal:subjects/assignments' }" clickable>
            <q-item-section avatar>
              <q-icon name="edit" />
            </q-item-section>
            <q-item-section>Assignments</q-item-section>
          </q-item>
        </q-list>
      </q-card>

      <router-view class="tw-w-full" />
    </div>
  </app-page-container>
</template>
<script>
import { LoadingBar } from "quasar";
import { useSchedule } from "src/stores/schedule";
import { getBackgroundColor } from "src/utils";
import { computed, provide } from "vue";
import { useRoute } from "vue-router";

export default {
  async beforeRouteEnter(to, from, next) {
    const store = useSchedule(to.params.id);
    if (store.schedule == null) {
      try {
        LoadingBar.start();
        await store.fetch();
        next();
      } catch (err) {
        next(from);
      } finally {
        LoadingBar.stop();
      }
    } else {
      next();
    }
  },
};
</script>
<script setup>
const route = useRoute();
const store = useSchedule(route.params.id);
const schedule = computed(() => store.schedule);

provide("schedule", schedule);
</script>
