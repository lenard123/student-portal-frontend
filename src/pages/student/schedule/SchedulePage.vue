<template>
  <div class="tw-p-8">
    <div class="tw-text-2xl tw-font-bold">Class Schedule</div>

    <q-card class="tw-mt-4">
      <q-card-section>
        <FullCalendar :options="calendarOptions" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/vue3";
// import interactionPlugin from "@fullcalendar/interaction";

const calendarOptions = {
  plugins: [dayGridPlugin],
  initialView: "dayGridMonth",
  events: [
    { title: "event 1", date: "2023-08-16" },
    { title: "event 2", date: "2023-08-17" },
  ],
};
</script>
