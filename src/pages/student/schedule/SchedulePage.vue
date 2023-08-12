<template>
  <div class="tw-p-8">
    <div class="tw-text-2xl tw-font-bold">Class Schedule</div>

    <q-card class="tw-mt-4 tw-max-w-screen-lg">
      <q-card-section>
        <q-calendar view="week" :interval-start="6" :interval-count="12" />
      </q-card-section>
    </q-card>
  </div>
</template>
