<template>
  <q-card class="tw-w-full tw-max-w-[300px]">
    <q-card-section class="tw-text-white" :class="getBackgroundColor(schedule.id)">
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
      <div class="tw-bg-white/50 tw-mt-4 tw-p-2 tw-rounded tw-flex tw-flex-col tw-gap-2">
        <div class="tw-flex tw-gap-2 tw-items-end">
          <span class="tw-font-bold tw-text-lg tw-leading-5">0</span>
          <span>Lesson</span>
        </div>
        <div class="tw-flex tw-gap-2 tw-items-end">
          <span class="tw-font-bold tw-text-lg tw-leading-5">0</span>
          <span>Assignments</span>
        </div>
        <div class="tw-flex tw-justify-end">
          <q-btn :to="{
            name: to,
            params: { id: schedule.id },
          }" icon="folder" size="sm" unelevated label="View" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { getBackgroundColor } from 'src/utils';

defineProps(['schedule', 'to'])
</script>
